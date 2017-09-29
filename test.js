'use strict'
const test = require('tape')
const driveByPath = require('.')

test('driveByPath()', t => {
  t.throws(() => driveByPath(), /got `undefined`/)
  t.throws(() => driveByPath(1), /got `number`/)

  driveByPath(__dirname)
    .then(_ => {
      t.ok(_)
      t.ok(_.mountpointPath)
      t.ok(_.drive)
      t.end()
    })
    .catch(t.end)
})
