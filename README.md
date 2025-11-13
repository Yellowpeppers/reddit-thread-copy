# Reddit Copy Thread

Chrome MV3 extension to copy a Reddit post and its **nested comments** into your clipboard.
Supports **Markdown**, **Plain Text**, and **JSON**.

## Features
- One-click popup: *Scrape & Preview* → *Copy*.
- Rebuilds the nested comment tree, tries to expand a round of `more`.
- Outputs: **Markdown**, **Text**, **JSON**.
- No server. All logic runs locally.
- Minimal permissions.

## Install (Developer Mode)
方法 A（推荐，免解压）
1) 到 GitHub → Releases 下载 `reddit-copy-threadv-<版本号>.zip`（例如 `reddit-copy-threadv-0.2.0.zip`，不要选 “Source code” 包）。
2) 打开 Chrome → `chrome://extensions`，开启 **开发者模式**。
3) 直接把这个 ZIP 拖进扩展页面，Chrome 会自动加载。

方法 B（解压加载）
1) 解压 ZIP 得到 7 个文件：`manifest.json`、`popup.html/js/css`、`icon16/48/128.png`。
2) 放入一个文件夹（例如 `reddit-copy-thread/`）。
3) 在 `chrome://extensions` 点击 **加载已解压的扩展程序**，选择该文件夹。
5. Open any Reddit thread and click the toolbar icon.

Tip: If your unzip tool shows errors, try the system unzip:
`unzip reddit-copy-thread.zip`

## Usage
- Click **抓取并预览** to build the tree.
- Select **Markdown / 纯文本 / JSON**.
- Click **复制** to copy to clipboard.

## Privacy
- No data is sent to any server.
- All processing happens locally in your browser.

## Files
```
manifest.json
popup.html
popup.js
popup.css
icon16.png, icon48.png, icon128.png
```

## License
[MIT](./LICENSE)

_Last updated: 2025-11-13_
