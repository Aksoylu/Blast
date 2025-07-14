const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');

const { FileSystemService } = require("./native-bridge/FileSystemService");
const { FileDialogService } = require("./native-bridge/FileDialogService");
const { UserSessionService } = require("./native-bridge/UserSessionService");
const { WorkspaceService } = require('./native-bridge/WorkspaceService');

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
    const fileDialogService = FileDialogService.getInstance();
    const fileSystemService = FileSystemService.getInstance();
    const userSessionService = UserSessionService.getInstance().InjectDependencies(fileSystemService);
    const workspaceService = WorkspaceService.getInstance().InjectDependencies(fileSystemService);

    registerIpcHandlers({
        FileDialogService: fileDialogService,
        FileSystemService: fileSystemService,
        UserSessionService: userSessionService,
        WorkspaceService: workspaceService
    });

    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });

});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
