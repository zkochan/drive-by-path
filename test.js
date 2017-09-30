'use strict'
const test = require('tape')
const driveByPath = require('.')

test('driveByPath()', t => {
  t.throws(() => driveByPath(), /got `undefined`/)
  t.throws(() => driveByPath(1), /got `number`/)

  driveByPath(__dirname)
    .then(drive => {
      t.ok(drive)
      t.ok(drive.matchedMountpointPath)
      t.ok(drive.device)
      t.end()
    })
    .catch(t.end)
})
