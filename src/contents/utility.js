if (typeof window.utility !== "undefined") {
  console.log("Utility已经安装");
} else {
  window.utility = new Proxy(
    new Proxy({
      requestAccount: function (target, propKey) {
        return new Promise(async (resolve, reject) => {
          window.postMessage({
            type: 'GET_ACCOUNT'
          }, '*');
          let one = window.addEventListener('message', (event) => {
            if (event.data.type === 'ACCOUNT_RESULT') {
              window.removeEventListener('message', one);
              resolve(event.data.account);
            }
          });
        });
      },
    }, {}), {}
  );
}