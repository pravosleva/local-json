/* eslint-disable node/no-unpublished-require */
/* eslint-disable import/no-extraneous-dependencies */
const electron = require('electron')

const { remote } = electron
const { screen } = remote

window.close = () => {
  remote.getCurrentWindow().close()
}
window.maximize = () => {
  remote.getCurrentWindow().maximize()
}
window.minimize = () => {
  remote.getCurrentWindow().minimize()
}
const unmaximizeIfNecessary = () => {
  if (remote.getCurrentWindow().isMaximized()) {
    remote.getCurrentWindow().unmaximize()
  }
}
const fullscreenUnsetIfNecessary = () => {
  if (remote.getCurrentWindow().isFullScreen()) {
    remote.getCurrentWindow().setFullScreen(false)
  }
}
const restore = () => {
  fullscreenUnsetIfNecessary()
  unmaximizeIfNecessary()
  remote.getCurrentWindow().setSize(900, 600)
}
window.mobileSize = ({ width, height }) => {
  restore()
  const display = screen.getPrimaryDisplay()
  // console.log(display)
  /* SAMPLE:
    {
      accelerometerSupport: "unknown"
      bounds: {x: 0, y: 0, width: 1920, height: 1080}
      colorDepth: 24
      colorSpace: "{primaries_d50_referred: [[0.6868, 0.3126],  [0.2634, 0.6918],  [0.1402, 0.0588]], transfer:IEC61966_2_1, matrix:RGB, range:FULL}"
      depthPerComponent: 8
      id: 21536134253248576
      internal: false
      monochrome: false
      rotation: 0
      scaleFactor: 2
      size: {width: 1920, height: 1080}
      touchSupport: "unknown"
      workArea: {x: 62, y: 27, width: 1858, height: 1053}
      workAreaSize: {width: 1858, height: 1053
    }
  */
  try {
    remote.getCurrentWindow().restore()
    remote.getCurrentWindow().setSize(width, display.workAreaSize.height)
    remote.getCurrentWindow().setPosition(display.size.width - width, 0, true)
  } catch (err) {
    console.log(err)
  }
}
window.fullscreen = () => {
  remote.getCurrentWindow().setFullScreen(true)
}
window.restore = restore

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  // const replaceText = (selector, text) => {
  //   const element = document.getElementById(selector)
  //   if (element) element.innerText = text
  // }
  // for (const type of ['chrome', 'node', 'electron']) {
  //   replaceText(`${type}-version`, process.versions[type])
  // }
  // document.getElementById('close-app-btn').addEventListener('click', (_e) => {
  //   console.log(electron)
  //   window.close()
  // })
})
