# Windows Text Suggestions Fix for Google Editors

A small Chromium browser extension that helps restore Windows 11 physical-keyboard text suggestions in **Google Translate** and the **Google Apps Script editor**.

It was created after testing a specific issue where the Windows text-suggestion popup appeared, but accepting a suggestion did not insert the completed word in these Google editors. In the tested fields, changing the textarea's `autocorrect` attribute from `off` to `on` fixed the behavior.

> This is a community workaround, not an official Google or Microsoft product. It may not fix every text-suggestion issue or work with every version of the sites or browser.

## What it does

- Runs only on `translate.google.com` and `script.google.com`.
- Finds textareas whose `autocorrect` attribute is explicitly set to `off` and changes it to `on`.
- Watches for textareas that are added, replaced, or changed later by the page.
- Does not request special browser permissions.
- Does not send data anywhere, make network requests, or collect browsing history.

The extension changes a page setting locally in your browser. It does not change Windows settings.

## Requirements

- Windows 11 with **Settings → Time & language → Typing → Show text suggestions when typing on the physical keyboard** enabled.
- A Chromium-based browser that supports unpacked Manifest V3 extensions, such as Google Chrome or Microsoft Edge.
- The relevant Google editor page.

The exact Windows settings wording may vary slightly by Windows version.

## Install from source

This project is currently distributed as source code. No Chrome Web Store listing is provided.

1. Download or clone this repository.
2. Extract the ZIP if you downloaded it.
3. Open `chrome://extensions` in Chrome, or `edge://extensions` in Microsoft Edge.
4. Turn on **Developer mode**.
5. Select **Load unpacked**.
6. Choose the project folder containing `manifest.json`.
7. Reload Google Translate or the Google Apps Script editor.

For Chrome, the extension management page is `chrome://extensions`. For Edge, use `edge://extensions`.

## Verify that it is active

1. Open Google Translate or the Apps Script editor.
2. Open Developer Tools (`F12`) and select **Console**.
3. Look for a message beginning with `[Windows Text Suggestions Fix]`.
4. Focus the relevant text area. In the Console, run:

   ```js
   document.activeElement.getAttribute("autocorrect")
   ```

   For a supported textarea that the extension has fixed, the expected result is `"on"`.

If the active editor is not a textarea, or the page changes its structure, this check may not apply.

## Troubleshooting

- Confirm Windows physical-keyboard text suggestions are enabled.
- Confirm the extension is enabled on the extensions page.
- Reload the Google page after installing or updating the extension.
- Check the Console for `[Windows Text Suggestions Fix]` messages.
- If the site changes its editor implementation, this workaround may need an update.

## Scope and limitations

- The extension only targets the two hostnames listed in `manifest.json`; it is not a system-wide fix.
- `all_frames` allows injection into matching frames, but a frame on a different, unlisted hostname will not be modified.
- The behavior was confirmed in a specific Windows 11 setup. Other configurations may behave differently.
- Enabling `autocorrect` may affect text-entry behavior in the targeted fields. If it causes an unwanted side effect, disable or remove the extension.
- This project is not affiliated with, endorsed by, or supported by Google or Microsoft.

## Privacy

The extension has no background service worker, does not request broad site permissions, and contains no analytics or telemetry. Its content script runs on the two listed Google hostnames and modifies matching textarea attributes in the page.

## Contributing

Bug reports, reproduction steps, and narrowly scoped improvements are welcome. When reporting an issue, include:

- Windows version
- Browser and version
- Which supported Google editor is affected
- Whether the suggestion popup appears and what happens when a suggestion is accepted
- Any relevant Console messages

Do not include private documents, translations, scripts, credentials, or other sensitive information in an issue report.

## License

Released under the MIT License. See [`LICENSE`](LICENSE).
