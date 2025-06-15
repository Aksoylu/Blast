const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        autoHideMenuBar: true,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false,
            preload: path.join(__dirname, './preload.js')  // preload.js burada
        },
    });

    Menu.setApplicationMenu(null);

    win.loadURL('http://localhost:5173');

    ipcMain.on('toMain', (event, data) => {
        console.log('Renderer’dan gelen:', data);
        event.sender.send('fromMain', `Mesaj alındı: ${data}`);
    });
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });


});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
