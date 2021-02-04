# electron-react-boilerplate-2021

> **[electron-quick-start app](https://github.com/electron/electron-quick-start)** based. Thanx to contributors!

### `yarn install-all`

Electron side deps will be installed then frontend side deps will be installed.

### `yarn dev`

You can use hot reload dev mode for frontend react app in this electron app. Electron app BrowserWindow will be created when `http://localhost:3000` will be available.

### `yarn fresh-prod-start`

Fresh frontend will be built to `frontend/build` then will be used.

### `yarn start`

Old build will be used in `frontend/build`.

### `yarn dist`

You can run `$ yarn dist` (to package in a distributable format (e.g. dmg, windows installer, deb package)) or `$ yarn pack` (only generates the package directory without really packaging it. This is useful for testing purposes). See also [electron-builder](https://www.electron.build/). **Note!** to build rpm, executable rpmbuild is required, please install: `$ sudo apt-get install rpm`

See result in `/release`.

To ensure your native dependencies are always matched with electron version, simply add script `"postinstall": "electron-builder install-app-deps"` to your `package.json`.

## How to make fresh CRA project

- `$ rm -rf ./frontend`
- `$ create-react-app frontend`
- Needs edits in `package.json` like this: `"dev": "BROWSER=none react-scripts start"`
- Add `"homepage": "./"` to `./frontend/package.json` for have relative paths in `./frontend/build/index.html`
- `./frontend/.env` with `SKIP_PREFLIGHT_CHECK=true` if necessary.

## How this repository was created

**STEP 1:** [electron-quick-start](https://github.com/electron/electron-quick-start)

- Clone the Quick Start repository `$ git clone https://github.com/electron/electron-quick-start`
- Go into the repository `$ cd electron-quick-start`
- Install the dependencies `$ npm install` (and run `npm start`)

**STEP 2:** [create-react-app](https://github.com/facebook/create-react-app)

- `$ create-react-app frontend && cd frontend`
- Add `"homepage": "./"` to `frontend/package.json` for have relative paths in `./frontend/build/index.html`
- Replace `mainWindow.loadFile('./index.html')` with `mainWindow.loadFile('./frontend/build/index.html')` in `main.js`
- Comment out everything in `preload.js`
- Add to `fontend/package.json` scripts: `"dev": "BROWSER=none react-scripts start",`
- Add to `package.json` scripts: `"dev": "concurrently --kill-others \"yarn frontend-dev\" \"NODE_ENV=development electron .\"",`
- Add changes to `main.js`:

```javascript
const dev = process.env.NODE_ENV === 'development'

// ...
function createWindow() {
  // ...
  if (!dev) {
    mainWindow.loadFile('./frontend/build/index.html')
  } else {
    mainWindow.loadURL('http://localhost:3535')
  }
  // ...
}
```

- Add file `polling-to-frontend.js` to have ability to check if `http://localhost:3535` available.
- Add code to `main.js` _(WAY 1 should be replaced to WAY 2)_.

```javascript
const createPollingByConditions = require('./polling-to-frontend')
  .createPollingByConditions
const CONFIG = {
  FRONTEND_DEV_URL: 'http://localhost:3535',
  FRONTEND_FIRST_CONNECT_INTERVAL: 4000,
  FRONTERN_FIRST_CONNECT_METHOD: 'get',
}
let connectedToFrontend = false

// WAY 1: Without checking conditions.
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// app.on('ready', createWindow);

// WAY 2: Need to check something conditions.
// I'm gonna check if CONFIG.FRONTEND_DEV_URL resource available then create window...
app.on('ready', () => {
  if (dev) {
    createPollingByConditions({
      url: CONFIG.FRONTEND_DEV_URL,
      method: CONFIG.FRONTERN_FIRST_CONNECT_METHOD,
      interval: CONFIG.FRONTEND_FIRST_CONNECT_INTERVAL,
      callbackAsResolve: () => {
        console.log(`SUCCESS! CONNECTED TO ${CONFIG.FRONTEND_DEV_URL}`)
        connectedToFrontend = true

        createWindow()
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
    createWindow()
  }
})
```

- Remove `renderer.js` and `index.html` from main directory.

**STEP 3:** Add some scripts to `package.json` if necessary.
