export { }
console.log("HELLO WORLD FROM BGSCRIPTS")

let currentWindowID = new Proxy(
    { id: 0 },
    {
        get: function (target, prop) {
            if (prop === 'id') return target[prop] || 0
            return target[prop];
        },
        set: function (target, prop, value) {
            target[prop] = value;
            return true;
        }
    }
);


let windowId = null; // 用来记录已打开窗口的ID

// 监听来自内容脚本的消息
chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
    if (request.type === 'GREETING') {
        getCWId(sender);
        // 如果已经有一个窗口打开，不再创建新窗口
        if (windowId !== null) {
            console.log('Window already opened.');
            return;
        }
        // 计算新窗口的位置
        chrome.windows.getCurrent(async function (currentWindow) {
            const width = 360; // 新窗口的宽度
            const height = 620; // 新窗口的高度
            const left = currentWindow.left + (currentWindow.width - width);
            const top = currentWindow.top;
            // 创建新窗口
            await chrome.windows.create({
                url: 'options.html',
                type: 'popup',
                width: width,
                height: height,
                left: left,
                top: top,
                focused: true
            }, function (nW) {
                windowId = nW.id; // 记录新窗口的ID
                //监听窗口的页面加载完成事件
                chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
                    if (changeInfo.status === 'complete' && tabId === nW.tabs[0].id) {
                        chrome.tabs.sendMessage(nW.tabs[0].id, { type: 'GREETING', message: request.message })
                    }
                });
            });

        });
    }

    if (request.type === 'GET_ACCOUNT') {
        chrome.tabs.sendMessage(currentWindowID.id, { type: 'GET_ACCOUNT', message: request.message })
        chrome.windows.remove(windowId);
    }
});

// 监听窗口关闭事件
chrome.windows.onRemoved.addListener(function (closedWindowId) {
    console.log('windowId:', windowId)
    if (closedWindowId === windowId) {
        console.log('Window with ID ' + windowId + ' has been closed.');
        windowId = null; // 清除已关闭窗口的ID
    }
});



// 获取请求页面的ID
function getCWId(sender) {
    chrome.tabs.query({}, (tabs) => {
        tabs.forEach(function (tab) {
            if (tab.url === sender.url && tab.active) {
                currentWindowID.id = tab.id;
            }
        });
    })
}