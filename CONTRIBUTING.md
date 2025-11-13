# Contributing

Thanks for your interest in improving Reddit Copy Thread! Contributions of all kinds are welcome: bug reports, feature requests, docs, and code.

## Development Setup
- Clone the repo and open in your editor.
- Load the extension in Chrome:
  - Go to `chrome://extensions` → enable Developer mode
  - Click “Load unpacked” and select this folder
- Open a Reddit thread, click the toolbar icon, and test.

## How to Propose Changes
- Open an issue first for larger changes to discuss direction.
- Fork the repo and create a branch: `feat/your-idea` or `fix/issue-xyz`.
- Keep PRs focused and small when possible.
- Add/update README if behavior or usage changes.

## Coding Guidelines
- Keep permissions minimal in `manifest.json`.
- Avoid external services; all logic should run locally.
- Prefer readable, straightforward code over cleverness.

## Commit Messages
- Use clear, descriptive messages.
- Reference issues like `Fixes #12` when applicable.

## Reporting Bugs
- Include the Reddit URL you tested
- Steps to reproduce
- What you expected vs. what happened
- Your browser and OS

Thanks again for helping make this tool better!
