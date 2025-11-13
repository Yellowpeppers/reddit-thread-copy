
let cache = { md: "", txt: "", jsonText: "", meta: null };

async function getActiveTabUrl() {
  const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
  return tab?.url || "";
}
function toJsonUrl(url) {
  try {
    const u = new URL(url);
    if (!/\/comments\//.test(u.pathname)) return null;
    const path = u.pathname.replace(/\/$/, "");
    return `https://www.reddit.com${path}.json?raw_json=1&depth=10&limit=500&sort=best`;
  } catch (e) { return null; }
}
function indent(n){ return "  ".repeat(n); }
function mdEscape(s){ return (s ?? "").replace(/\r/g,"").replace(/\t/g,"  "); }
async function fetchJson(url) {
  const resp = await fetch(url, { credentials: "include" });
  if (!resp.ok) throw new Error(`请求失败: ${resp.status}`);
  return await resp.json();
}
function collectMoreIds(nodes, out) {
  for (const n of nodes || []) {
    if (!n) continue;
    if (n.kind === "more") {
      const ids = n.data?.children || [];
      for (const id of ids) out.add(id);
    } else if (n.kind === "t1") {
      const replies = n.data?.replies?.data?.children || [];
      collectMoreIds(replies, out);
    }
  }
}
async function fetchMoreChildren(linkFullname, ids, sort="best") {
  if (!ids.length) return null;
  const qs = new URLSearchParams({
    api_type: "json",
    link_id: linkFullname,
    children: ids.slice(0, 100).join(","),
    sort
  });
  const url = `https://www.reddit.com/api/morechildren.json?${qs.toString()}`;
  const data = await fetchJson(url);
  return data?.json?.data?.things || [];
}

// ---------- Builders ----------
async function renderNodesMarkdown(lines, nodes, depth, opts) {
  for (const n of nodes || []) {
    if (!n || !n.kind) continue;
    if (n.kind === "t1") {
      const d = n.data || {};
      const meta = `u/${d.author} | ↑${d.score ?? 0}`;
      const body = mdEscape(d.body || "");
      lines.push(`${indent(depth)}- **${meta}**`);
      if (body) {
        const parts = body.split("\n");
        for (const p of parts) lines.push(`${indent(depth)}  ${p}`);
      }
      const childNodes = d.replies?.data?.children || [];
      await renderNodesMarkdown(lines, childNodes, depth + 1, opts);
    } else if (n.kind === "more") {
      if (opts.expandMore && opts.linkFullname) {
        const ids = (n.data?.children || []).filter(Boolean);
        if (ids.length) {
          const things = await fetchMoreChildren(opts.linkFullname, ids, opts.sort || "best");
          await renderNodesMarkdown(lines, things, depth, opts);
          continue;
        }
      }
      lines.push(`${indent(depth)}- _更多评论…_`);
    }
  }
}

async function renderNodesText(lines, nodes, depth, opts) {
  for (const n of nodes || []) {
    if (!n || !n.kind) continue;
    if (n.kind === "t1") {
      const d = n.data || {};
      const meta = `u/${d.author} | ↑${d.score ?? 0}`;
      const body = (d.body || "").replace(/\r/g,"");
      lines.push(`${indent(depth)}- ${meta}`);
      if (body) {
        const parts = body.split("\n");
        for (const p of parts) lines.push(`${indent(depth)}  ${p}`);
      }
      const childNodes = d.replies?.data?.children || [];
      await renderNodesText(lines, childNodes, depth + 1, opts);
    } else if (n.kind === "more") {
      if (opts.expandMore && opts.linkFullname) {
        const ids = (n.data?.children || []).filter(Boolean);
        if (ids.length) {
          const things = await fetchMoreChildren(opts.linkFullname, ids, opts.sort || "best");
          await renderNodesText(lines, things, depth, opts);
          continue;
        }
      }
      lines.push(`${indent(depth)}- [更多评论…]`);
    }
  }
}

function toTree(nodes) {
  const out = [];
  for (const n of nodes || []) {
    if (!n || !n.kind) continue;
    if (n.kind === "t1") {
      const d = n.data || {};
      const item = {
        id: d.id,
        author: d.author,
        score: d.score ?? 0,
        body: d.body || "",
        permalink: d.permalink ? `https://www.reddit.com${d.permalink}` : null,
        created_utc: d.created_utc || null,
        children: toTree(d.replies?.data?.children || [])
      };
      out.push(item);
    } else if (n.kind === "more") {
      out.push({
        more: true,
        count: n.data?.count ?? null,
        children_ids: n.data?.children || []
      });
    }
  }
  return out;
}

async function buildAllFormats(json) {
  const post = json?.[0]?.data?.children?.[0]?.data;
  const roots = json?.[1]?.data?.children || [];
  const moreIds = new Set();
  collectMoreIds(roots, moreIds);
  const linkFullname = post ? `t3_${post.id}` : null;
  const sort = "best";

  // Markdown
  const mdLines = [];
  if (post) {
    mdLines.push(`# ${mdEscape(post.title || "")}`);
    mdLines.push(`by u/${post.author} | r/${post.subreddit} | ↑${post.score}`);
    if (post.selftext) mdLines.push("", mdEscape(post.selftext));
    if (post.url && post.post_hint === "link") mdLines.push("", `链接: ${post.url}`);
    mdLines.push("", "---", "");
  }
  await renderNodesMarkdown(mdLines, roots, 0, {
    expandMore: moreIds.size > 0,
    linkFullname, sort
  });
  const md = mdLines.join("\n");

  // Plain text
  const txtLines = [];
  if (post) {
    txtLines.push(`${post.title || ""}`);
    txtLines.push(`by u/${post.author} | r/${post.subreddit} | ↑${post.score}`);
    if (post.selftext) txtLines.push("", post.selftext.replace(/\r/g,""));
    if (post.url && post.post_hint === "link") txtLines.push("", `链接: ${post.url}`);
    txtLines.push("", "----------------", "");
  }
  await renderNodesText(txtLines, roots, 0, {
    expandMore: moreIds.size > 0,
    linkFullname, sort
  });
  const txt = txtLines.join("\n");

  // JSON tree
  const jsonObj = {
    source: "reddit",
    url: post?.permalink ? `https://www.reddit.com${post.permalink}` : null,
    title: post?.title || null,
    subreddit: post?.subreddit || null,
    author: post?.author || null,
    score: post?.score ?? null,
    created_utc: post?.created_utc || null,
    selftext: post?.selftext || null,
    comments: toTree(roots)
  };
  const jsonText = JSON.stringify(jsonObj, null, 2);

  return {
    md, txt, jsonText,
    meta: { title: post?.title || "", moreCount: moreIds.size }
  };
}

// ---------- UI logic ----------
function setStatus(text){ document.querySelector("#status").textContent = text; }
function setPreview(text){ document.querySelector("#preview").textContent = text; }
function setMeta(text){ document.querySelector("#meta").textContent = text; }

function refreshPreviewByFormat() {
  const fmt = document.querySelector("#fmt").value;
  if (fmt === "md") setPreview(cache.md || "");
  else if (fmt === "txt") setPreview(cache.txt || "");
  else if (fmt === "json") setPreview(cache.jsonText || "");
}

document.addEventListener("DOMContentLoaded", () => {
  const scrapeBtn = document.querySelector("#scrapeBtn");
  const copyBtn = document.querySelector("#copyBtn");
  const fmtSel = document.querySelector("#fmt");

  fmtSel.addEventListener("change", () => {
    refreshPreviewByFormat();
  });

  scrapeBtn.addEventListener("click", async () => {
    setStatus("抓取中…");
    setPreview("");
    setMeta("");
    copyBtn.disabled = true;
    try {
      const url = await getActiveTabUrl();
      const jsonUrl = toJsonUrl(url);
      if (!jsonUrl) throw new Error("当前页面不是 Reddit 帖子评论页");
      const raw = await fetchJson(jsonUrl);
      cache = await buildAllFormats(raw);

      setMeta(`标题: ${cache.meta.title}\n提示: 已尝试展开“更多评论”；如仍有遗漏，请先在页面手动展开再抓取。`);
      refreshPreviewByFormat();
      setStatus("完成");
      copyBtn.disabled = false;
    } catch (e) {
      console.error(e);
      setStatus(`失败: ${e.message}`);
    }
  });

  copyBtn.addEventListener("click", async () => {
    try {
      const text = document.querySelector("#preview").textContent || "";
      if (!text.trim()) return;
      await navigator.clipboard.writeText(text);
      setStatus("已复制到剪贴板");
      setTimeout(() => setStatus("完成"), 1200);
    } catch (e) {
      setStatus("复制失败，请检查浏览器权限");
    }
  });
});
