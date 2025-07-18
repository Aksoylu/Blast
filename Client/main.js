const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');

const { BaseService } = require("./native-bridge/Infrastructure/BaseService");
const { FileSystemService } = require("./native-bridge/Services/FileSystemService");
const { FileDialogService } = require("./native-bridge/Services/FileDialogService");
const { UserSessionService } = require("./native-bridge/Services/UserSessionService");
const { WorkspaceService } = require('./native-bridge/Services/WorkspaceService');

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

/**
 * Dynamically registers IPC handlers
 * @param {{ [serviceName: string]: any }} services
 */
function registerIpcHandlers(services) {
    for (const [serviceName, serviceInstance] of Object.entries(services)) {
        const prototype = Object.getPrototypeOf(serviceInstance);

        const methodNames = Object.getOwnPropertyNames(prototype)
            .filter(name => typeof serviceInstance[name] === 'function' && name !== 'constructor');

        for (const methodName of methodNames) {
            if (methodName !== "InjectDependencies") {
                const channel = `${serviceName}:${methodName}`;
                const handler = serviceInstance[methodName].bind(serviceInstance);

                ipcMain.handle(channel, handler);
                console.log(`[IPC Registered] ${channel}`);
            }
        }
    }
}

app.whenReady().then(() => {
    registerIpcHandlers({
        FileDialogService: BaseService.getInstance(FileDialogService),
        FileSystemService: BaseService.getInstance(FileSystemService),
        UserSessionService: BaseService.getInstance(UserSessionService),
        WorkspaceService:  BaseService.getInstance(WorkspaceService)
    });

    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });

});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
