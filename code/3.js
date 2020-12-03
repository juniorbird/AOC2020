// first, read in the data for today. Don't worry about size.
const fs = require('fs')
const path = require('path')
let data

// synchronous, because let's bail if we can't read
try {
	data = fs.readFileSync(path.resolve(__dirname, '../input/3.txt'), 'utf8')
} catch (err) {
	console.error(err)
}

// Now let's clean the data
// First step: array with 1 line per line of input
data = data.split('\n')

const run = 3, rise = 1, tree = '#', mapHeight = data.length, mapWidth = data[0].length
let right = 0, down = 0, treeCount = 0

console.log('map width', mapWidth, "map height", mapHeight)

// Now we'll just loop through the lines
// Each "down" is the next el in the array
// Each "right" is just a charAt
for (down; down < mapHeight; down = down + rise) {
	console.log(`checking element ${right}, ${down}, with value ${data[down].charAt(right)}`)
	if (data[down].charAt(right) === tree) treeCount++
	right = (right + run) % mapWidth
}

console.log('total trees', treeCount)
