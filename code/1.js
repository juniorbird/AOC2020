// first, read in the data for today. Don't worry about size.
const fs = require('fs')
const path = require('path')
let data, target = 2020

// synchronous, because let's bail if we can't read
try {
	data = fs.readFileSync(path.resolve(__dirname, '../input/1.txt'), 'utf8')
} catch (err) {
	console.error(err)
}

data = data.split('\n').filter(v => v < target).sort((a, b) => a-b)

/*
	Let's only loop once here. We'll store every number as we loop in a hashtable
	Then, if we subtract currentNumber from 2020, and the remainder is found in the table
	Success!
*/

let numberTable = {}
let resultsTable = []


function loopData(numbers, testNum, skipIdx) {
	let len = numbers.length
	let i = 0, remainder

	while (i < len) {
		// subtract the current number and the externally provided number from the target number
		// skipping the target number
		remainder = target - numbers[i] - testNum
		if ((i !== skipIdx) && numberTable[remainder]) {
			// we've found all 3 numbers!
			resultsTable.push([numberTable[remainder], numbers[i], testNum])
			return([numberTable[remainder], numbers[i], testNum])
		} else if (i !== skipIdx) {
			// Nope, save the remainder for later use
			numberTable[numbers[i]] = numbers[i]
		}
		i++
	}
}


let k = 0, dataLength = data.length
while ((k < dataLength) && (resultsTable.length === 0)) {
	loopData(data, data[k], k)
	k++
}


let result = resultsTable[0].reduce((accum, val) => accum * val)

console.log('result', result)