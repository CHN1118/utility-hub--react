const utility = {
  Prototype: null,
  chainID: null,
  networkVersion: null,
  _events: {},
  _eventIdCounter: 0, // 用于生成唯一的事件ID

  request: function() {
    return new Promise((resolve, reject) => {
      const messageId = 'msg_' + this._eventIdCounter++; // 生成唯一的ID
      this._events[messageId] = { resolve, reject };
      
      window.postMessage({ type: 'GET_ACCOUNT', messageId }, '*');

      setTimeout(() => {
        if (this._events[messageId]) {
          delete this._events[messageId];
          reject(new Error("请求超时"));
        }
      }, 5000); // 5秒超时
    });
  },

  _handleMessage: function(event) {
    if (event.data.type === 'ACCOUNT_RESULT' && this._events[event.data.messageId]) {
      const { resolve } = this._events[event.data.messageId];
      resolve(event.data.account);
      delete this._events[event.data.messageId];
    }
  }
};

window.utility = new Proxy(utility, {
  get: function(target, prop) {
    if (prop in target) {
      return target[prop];
    } else {
      console.error(`Property ${prop} does not exist.`);
      return undefined;
    }
  },
  deleteProperty: function(target, prop) {
    if (prop in target) {
      delete target[prop];
      return true;
    } else {
      console.error(`Property ${prop} cannot be deleted because it does not exist.`);
      return false;
    }
  }
});

window.addEventListener('message', event => window.utility._handleMessage(event));
