/* eslint-disable node/no-unpublished-require */
/* eslint-disable import/no-extraneous-dependencies */
// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('path')

// --- Adds
const isDev = process.env.NODE_ENV === 'development'
const { createPollingByConditions } = require('./polling-to-frontend')
const expressApp = require('./express/server')()

const CONFIG = {
  EXPRESS_SERVER_PORT: 3536,
  FRONTEND_DEV_URL: 'http://localhost:3535',
  FRONTEND_FIRST_CONNECT_INTERVAL: 4000,
  FRONTERN_FIRST_CONNECT_METHOD: 'get',
}
let connectedToFrontend = false
// ---

const windowCfg = {
  minWidth: 400,
  minHeight: 500,
  width: 900, // 858,
  height: 600,
  frame: false,
  webPreferences: {
    preload: path.join(__dirname, 'preload.js'),
    nodeIntegration: true,
    enableRemoteModule: true,
    // contextIsolation: true,
  },
}
if (isDev) {
  windowCfg.width = 1200
  windowCfg.height = 800
}

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow(windowCfg)

  // and load the index.html of the app.
  // mainWindow.loadFile('index.html')
  if (!isDev) {
    // mainWindow.loadFile('./frontend/build/index.html')
    mainWindow.loadURL(`http://localhost:${CONFIG.EXPRESS_SERVER_PORT}`)
  } else {
    mainWindow.loadURL(CONFIG.FRONTEND_DEV_URL)
    mainWindow.webContents.openDevTools()
  }

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  return mainWindow
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  let mainWindow
  // WAY 1:
  // createWindow()
  // ---
  // WAY 2:
  if (isDev) {
    createPollingByConditions({
      url: CONFIG.FRONTEND_DEV_URL,
      method: CONFIG.FRONTERN_FIRST_CONNECT_METHOD,
      interval: CONFIG.FRONTEND_FIRST_CONNECT_INTERVAL,
      callbackAsResolve: () => {
        console.log(`SUCCESS! CONNECTED TO ${CONFIG.FRONTEND_DEV_URL}`)
        connectedToFrontend = true
        mainWindow = createWindow()
      },
      toBeOrNotToBe: () => !connectedToFrontend, // Need to reconnect again
      callbackAsReject: () => {
        console.log(`FUCKUP! ${CONFIG.FRONTEND_DEV_URL} IS NOT AVAILABLE YET!`)
        console.log(
          `TRYING TO RECONNECT in ${
            CONFIG.FRONTEND_FIRST_CONNECT_INTERVAL / 1000
          } seconds...`
        )
      },
    })
  } else {
    mainWindow = createWindow()
  }
  // ---

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  expressApp.close(() => {
    console.log('Express server closed.')
  })
  if (process.platform !== 'darwin') {
    app.quit()
  }
  // if (process.platform !== 'win32') {}
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
