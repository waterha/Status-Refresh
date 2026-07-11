English | [中文](README.md)

# Status Refresh

A browser extension that detects target websites and automatically closes the tab after continuously staying on it for a specified duration. Supports Chrome and Microsoft Edge.

## Features

- Matches target websites by keywords in URL or page title
- Automatically closes the tab after staying on it continuously for the configured number of seconds
- Timer resets when switching tabs
- Configure target keywords and time limit via popup UI

## Installation

1. Download or clone this repository
2. Open the browser extensions page:
   - Chrome: navigate to `chrome://extensions`
   - Edge: navigate to `edge://extensions`
3. Enable "Developer mode"
4. Click "Load unpacked"
5. Select this project folder

## Usage

1. Click the extension icon in the browser toolbar
2. Enter target keywords (one per line), for example:
   ```
   douyin.com
   抖音
   ```
3. Set the time limit in seconds (default: 300 seconds / 5 minutes)
4. Click "Save"

Once saved, the extension continuously monitors the active tab in the background. When a page's URL or title matches any keyword and the continuous stay exceeds the configured time limit, the tab will be automatically closed.

## File Structure

```
manifest.json   - Extension manifest (Manifest V3)
background.js   - Background detection and timer logic
popup.html      - Configuration popup UI
popup.js        - Popup interaction logic
```

