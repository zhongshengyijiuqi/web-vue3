import isElectron from 'is-electron'

function getEnvironment () {
  if (/Android/i.test(navigator.userAgent)) return 'Android'
  else if (isElectron()) return 'Electron'
  else return 'Web'
}

const environment = getEnvironment()

export default environment
