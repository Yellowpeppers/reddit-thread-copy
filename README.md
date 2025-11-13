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
1. Go to GitHub → Releases, download `reddit-copy-thread.zip` (not the auto-generated “Source code” unless you know what you’re doing).
2. Unzip. You should get a folder named `reddit-copy-thread/` that contains `manifest.json`.
3. Chrome → `chrome://extensions` → enable **Developer mode**.
4. Click **Load unpacked** and select the `reddit-copy-thread/` folder.
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
