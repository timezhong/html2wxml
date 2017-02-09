var murmur = require('./')
var assert = require('assert')
var isEqual = require('arraybuffer-equal')
var hexToArrayBuffer = require('hex-to-array-buffer')

var testCases = [
  ['00000000', ''],
  ['fc8a8950', 'test'],
  ['5466c4d2', 'linus'],
  ['285c17ef', 'murmur'],
  ['64809f15', 'veni, vidi, vici'],
  ['b8bb014b', 'Caesar non supra grammaticos!'],
  ['4bce5d5c', 'Node.js® is a JavaScript runtime built on Chrome\'s V8 JavaScript engine.'],
  ['f3dc1fd4', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consectetur mollis orci a consectetur. Maecenas in ornare ligula, vel venenatis mauris.']
]

testCases.forEach(function (testCase) {
  assert(isEqual(murmur(testCase[1]), hexToArrayBuffer(testCase[0])))
})
