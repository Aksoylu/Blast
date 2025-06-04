const { contextBridge, ipcRenderer } = require('electron');
const Store = require('electron-store');

const store = new Store();

contextBridge.exposeInMainWorld('electronStore', {
  get: (key) => store.get(key),
  set: (key, value) => store.set(key, value),
});

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
