// This script setups browserify (and watchify if in development env)
// to bundle client side js

const fs = require('fs')
const browserify = require('browserify')
const watchify = require('watchify')
const b = browserify({
  entries: ['client/js/index.js'],
  cache: {},
  packageCache: {},
  plugin: process.env.NODE_ENV === 'development' ? [watchify] : undefined,
})

b.on('update', bundle)
bundle()

function bundle() {
  b.bundle()
    .on('error', console.error)
    .pipe(fs.createWriteStream('public/bundle.js'))
}
