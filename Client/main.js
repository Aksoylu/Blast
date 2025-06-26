const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');

const { FileSystemService } = require("./native-bridge/FileSystemService");
const { FileDialogService } = require("./native-bridge/FileDialogService");

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
    ipcMain.handle('FileSystemService:ReadFileAsBinary', FileSystemService.ReadFileAsBinary);
    ipcMain.handle('FileSystemService:IsFileExist', FileSystemService.IsFileExist);
    ipcMain.handle('FileDialogService:ReadFileAsBinary', FileDialogService.ReadFileContentAsBinary);
    ipcMain.handle('FileDialogService:GetFilePath', FileDialogService.GetFilePath);

    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });

});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
