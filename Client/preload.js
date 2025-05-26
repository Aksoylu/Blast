const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  send: (channel, data) => {
    // Güvenlik için izin verilen kanallar listesi
    const validChannels = ['toMain'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  receive: (channel, func) => {
    const validChannels = ['fromMain'];
    if (validChannels.includes(channel)) {
      // event argümanını gizleyip sadece data gönderiyoruz
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  }
});
