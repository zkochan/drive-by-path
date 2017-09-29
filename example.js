'use strict'
const driveByPath = require('.')

driveByPath(__dirname)
  .then(drive => console.log(drive))
