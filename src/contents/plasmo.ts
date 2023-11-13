import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  run_at: "document_end"
}
// 把脚本注入到页面中
var s = document.createElement('script');
s.src = chrome.runtime.getURL('./utility.js');
(document.head || document.documentElement).appendChild(s);

const WinUrl = window.location.href;

window.addEventListener('message', (event) => {
  if (event.source === window && event.data.type && event.data.type === 'GET_ACCOUNT') {
    chrome.runtime.sendMessage({ type: 'GREETING', WinUrl: WinUrl, messageId: event.data.messageId });
  }
});

// 将账户结果传回网页
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type === 'GET_ACCOUNT') {
    window.postMessage({ type: 'ACCOUNT_RESULT', messageId: request.messageId, account: request.message, }, '*');
  }
  if (request.type === 'CLOSE_WINDOW') {
    window.postMessage({ type: 'CLOSE_WINDOW', messageId: request.messageId }, '*');
  }
});


