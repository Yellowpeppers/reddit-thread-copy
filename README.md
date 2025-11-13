# Reddit Copy Thread

[English](README.md) | [简体中文](README.zh-CN.md)

![Demo: extension popup and output modes](image.png)

Chrome MV3 extension to copy a Reddit post and its nested comments to your clipboard. Supports Markdown, Plain Text, and JSON. Runs entirely locally with minimal permissions.

## Features
- One-click popup: Scrape & Preview → Copy
- Rebuilds the nested comment tree, attempts a round of “more” expansion
- Outputs: Markdown, Text, JSON
- No server; all logic runs locally
- Minimal permissions

## Install (Developer Mode)
Method A (recommended, no unzip)
1) Go to GitHub → Releases and download `reddit-copy-threadv-<version>.zip` (e.g., `reddit-copy-threadv-0.2.0.zip`). Do not pick the “Source code” archives.
2) Open Chrome → `chrome://extensions` and enable Developer mode.
3) Drag the ZIP into the Extensions page and Chrome will load it directly.

Method B (load unpacked from extracted files)
1) Unzip to get 7 files: `manifest.json`, `popup.html/js/css`, `icon16/48/128.png`.
2) Put them into a folder (e.g., `reddit-copy-thread/`).
3) On `chrome://extensions` click “Load unpacked” and select that folder.
4) Open any Reddit thread and click the toolbar icon.

Tip: If your unzip tool shows errors, try the system unzip, for example:
`unzip reddit-copy-threadv-0.2.0.zip`

## Usage
- Click Scrape & Preview to build the tree.
- Choose Markdown / Plain Text / JSON.
- Click Copy to place output on the clipboard.

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
