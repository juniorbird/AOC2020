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

let ht = {}


function loopData(numbers) {
	let len = numbers.length
	let i = 0, remainder

	while (i < len) {
		remainder = target - numbers[i]
		if (ht[remainder]) {
			return([ht[remainder], numbers[i]])
		} else {
			ht[numbers[i]] = numbers[i]
		}
		i++
	}
}

let foo = loopData(data)

let result = foo[0] * foo[1]

console.log('result', result)