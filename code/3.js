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

// const run = 3, rise = 1, tree = '#', mapHeight = data.length, mapWidth = data[0].length
// let right = 0, down = 0, treeCount = 0

function countTrees(mapArray, run, rise) {
	let treeCount = 0, right = 0, down = 0, tree = '#'
	let mapHeight = mapArray.length, mapWidth = mapArray[0].length

	// Now we'll just loop through the lines
	// Each "down" is the next el in the array
	// Each "right" is just a charAt
	for (down; down < mapHeight; down = down + rise) {
		if (mapArray[down].charAt(right) === tree) treeCount++
		right = (right + run) % mapWidth
	}

	return treeCount
}

let mapSlopes = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]]

let slopeProduct = 1, slopeRight, slopeDown, treeCount

mapSlopes.forEach(slope => {
	slopeRight = slope[0]
	slopeDown = slope[1]
	treeCount = countTrees(data, slopeRight, slopeDown)
	console.log(`total trees with slope ${slopeRight}, ${slopeDown} = ${treeCount}`)
	slopeProduct = slopeProduct * treeCount
})

console.log('product', slopeProduct)
