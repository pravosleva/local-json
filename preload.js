/* eslint-disable node/no-unpublished-require */
/* eslint-disable import/no-extraneous-dependencies */
const electron = require('electron')

const { remote } = electron

window.close = () => {
  remote.getCurrentWindow().close()
}

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
  //   console.log(remote)
  //   const window = remote.getCurrentWindow()
  //   window.close()
  // })

  document.getElementById('close-app-btn').addEventListener('click', (_e) => {
    console.log(electron)
    window.close()
  })
})
