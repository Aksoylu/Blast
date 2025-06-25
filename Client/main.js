const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');

const { FileSystemService } = require("./native-bridge/FileSystemService");

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        autoHideMenuBar: false,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false,
            preload: path.join(__dirname, 'preload.js')
        },
    });

    //Menu.setApplicationMenu(null);
    win.loadURL('http://localhost:5173');
}

app.whenReady().then(() => {
    ipcMain.handle('dialog:openFile', FileSystemService.ReadFile);

    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });

});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
