'use strict'
const _drivelist = require('zkochan-drivelist')
const promisify = require('util.promisify')
const once = require('once')
const R = require('ramda')
const isSubdir = require('is-subdir')

const drivelist = promisify(_drivelist.list)
const sortByMountpoint = R.sortBy(R.prop('mountpoint'))
const drivesByMountpoints = once(_drivesByMountpoints)

module.exports = function driveByPath (path) {
  if (typeof path !== 'string') {
    throw new TypeError(`Expected \`path\` to be of type \`string\`, got \`${typeof path}\``)
  }
  return drivesByMountpoints()
    .then(drives => {
      const match = drives.find(drive => isSubdir(drive.mountpointPath, path))
      if (!match) {
        return null
      }
      return Object.assign({}, match.drive, {
        matchedMountpointPath: match.mountpointPath
      })
    })
}

function _drivesByMountpoints () {
  return drivelist()
    .then(groupedDrives => {
      return sortByMountpoint(
        R.unnest(
          groupedDrives.map(drive =>
            drive.mountpoints.map(mountpoint => ({
              mountpointPath: mountpoint.path,
              drive
            }))
          )
        )
      )
    })
}
