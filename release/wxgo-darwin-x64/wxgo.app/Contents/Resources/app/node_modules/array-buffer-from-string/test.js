var assert = require('assert')
var isEqual = require('arraybuffer-equal')
var hexToArrayBuffer = require('hex-to-array-buffer')
var arrayBufferFromString = require('./')

var testCases = [
  ['', ''],
  ['test', '7400650073007400'],
  ['linus', '6c0069006e0075007300'],
  ['murmur', '6d00750072006d0075007200'],
  ['veni, vidi, vici', '760065006e0069002c00200076006900640069002c0020007600690063006900'],
  ['Caesar non supra grammaticos!', '43006100650073006100720020006e006f006e0020007300750070007200610020006700720061006d006d0061007400690063006f0073002100'],
  ['😱 😂 🚀', '3dd831de20003dd802de20003dd880de']
]

testCases.forEach(function (testCase) {
  assert(isEqual(arrayBufferFromString(testCase[0]), hexToArrayBuffer(testCase[1])))
})
