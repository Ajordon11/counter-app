'use strict'
const electron = require("electron");

const { app, protocol, BrowserWindow, ipcMain } = electron;

import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'

let win
let secondWin
// Standard scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
    { scheme: 'app', privileges: { secure: true, standard: true } }
])
function createWindow(devPath, prodPath) {
    // Create the browser window.
    const options = {
        width: 800,
        height: 600,
        webPreferences: {
            // Use pluginOptions.nodeIntegration, leave this alone
            // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        },
    }
    if (devPath !== 'display') {
        options.frame = false;
        options.titleBarStyle = 'hidden';
        // options.fullscreen = true;
    }
    const window = new BrowserWindow(options)

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        window.loadURL(process.env.WEBPACK_DEV_SERVER_URL + devPath)
        if (!process.env.IS_TEST) window.webContents.openDevTools()
    } else {
        // Load the index.html when not in development
        window.loadURL(`app://./${prodPath}`)
    }

    return window
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win.isDestroyed()) {
        win = createWindow('', 'index.html')
    }
    if (secondWin.isDestroyed()) {
        secondWin = createWindow('display', 'display.html')
    }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
    if (isDevelopment && !process.env.IS_TEST) {
        // Install Vue Devtools
        try {
            await installExtension(VUEJS_DEVTOOLS)
        } catch (e) {
            console.error('Vue Devtools failed to install:', e.toString())
        }
    }
    if (!process.env.WEBPACK_DEV_SERVER_URL) {
        createProtocol('app')
    }
    win = createWindow('', 'index.html')
    secondWin = createWindow('display', 'display.html')
    secondWin.on('closed', () => {
        console.log('closed window');
        win.close();
        win = null;
        if (process.platform !== 'darwin') {
            app.quit()
        }
    });
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    if (process.platform === 'win32') {
        process.on('message', (data) => {
            if (data === 'graceful-exit') {
                app.quit()
            }
        })
    } else {
        process.on('SIGTERM', () => {
            app.quit()
        })
    }
}
ipcMain.on('test', (event, payload) => {
    win.webContents.send('main-test', payload);
});
ipcMain.on('timer:start', (event, payload) => {
    console.log('timer:start', payload);
    win.webContents.send('timer:start', payload);
});
ipcMain.on('timer:pause', (event, payload) => {
    console.log('timer:pause', payload);
    win.webContents.send('timer:pause', payload);
});
ipcMain.on('timer:time-limit', (event, payload) => {
    console.log('timer:time-limit', payload);
    win.webContents.send('timer:time-limit', payload);
});
ipcMain.on('score:team1', (event, payload) => {
    console.log('score:team1', payload);
    win.webContents.send('score:team1', payload);
});
ipcMain.on('score:team2', (event, payload) => {
    console.log('score:team2', payload);
    win.webContents.send('score:team2', payload);
});
ipcMain.on('score:name:team1', (event, payload) => {
    console.log('score:name:team1', payload);
    win.webContents.send('score:name:team1', payload);
});
ipcMain.on('score:name:team2', (event, payload) => {
    console.log('score:name:team2', payload);
    win.webContents.send('score:name:team2', payload);
});
ipcMain.on('timer:match-part', (event, payload) => {
    console.log('timer:match-part', payload);
    win.webContents.send('timer:match-part', payload);
});
ipcMain.on('timer:tourney-part', (event, payload) => {
    console.log('timer:tourney-part', payload);
    win.webContents.send('timer:tourney-part', payload);
});

