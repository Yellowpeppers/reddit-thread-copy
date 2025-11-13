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
1. Go to GitHub → Releases, download `reddit-copy-thread.zip`（不是自动生成的 “Source code” 包）。
2. 解压后你会得到 7 个文件（包含 `manifest.json`、`popup.html/js/css`、`icon*.png`）。将这 7 个文件放在一个新建的文件夹里，例如 `reddit-copy-thread/`。
3. Chrome → `chrome://extensions` → 开启 **开发者模式**。
4. 点击 **加载已解压的扩展程序**，选择刚才放好 7 个文件的那个文件夹。
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
