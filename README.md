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
1. Download the zip from Releases or this repo.
2. Unzip.
3. Chrome → `chrome://extensions` → enable **Developer mode**.
4. Click **Load unpacked** and select the unzipped folder.
5. Open any Reddit thread and click the toolbar icon.

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
