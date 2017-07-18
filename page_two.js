const remote = require('electron').remote
const main = remote.require('./main.js')

/*This is just front end code*/

const button = document.createElement('button')
button.textContent = 'Open Window'
button.addEventListener('click',e => {
  let window = remote.getCurrentWindow()
  main.openWindow('index')
  // Close the window after you open the new one.
  window.close()
},false)

document.body.appendChild(button)
