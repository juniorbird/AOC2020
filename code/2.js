// first, read in the data for today. Don't worry about size.
const fs = require('fs')
const path = require('path')
let data

// synchronous, because let's bail if we can't read
try {
	data = fs.readFileSync(path.resolve(__dirname, '../input/2.txt'), 'utf8')
} catch (err) {
	console.error(err)
}

// Now let's clean the data
// First step: array with 1 line per line of input
data = data.split('\n')

// Now let's clean up the values for each datum
let entry, minMax, cleanData = data.map(val => {
	entry = {}
	// split on spaces gets us 3 fields: frequency (string), letter (with colon), password
	val = val.split(' ')
	// console.log('val', val)

	// The password is cleanly in the third field
	entry.passwd = val[2]

	// The letter is not clean, it has a colon. Strip that.
	entry.letter = val[1].replace(':', '')

	// The frequency counts need to be changed into a single minimum number and a single maximum number
	minMax = val[0].split('-')
	entry.min = minMax[0]
	entry.max = minMax[1]

	return entry
})

// Check for validity
function passwordIsValid(password, reqChar, minChar, maxChar) {
	// use a regexp to count the number of instances of the required character
	let pwRegex = new RegExp(reqChar, 'g')
	let count, matches = password.match(pwRegex)
	if (matches) count = [...matches].length
	return ((count >= minChar) && (count <= maxChar))
}

// we now have a usable array of objects that we can loop through and check if they're valid
let countValid = 0
cleanData.forEach(datum => {
	if(passwordIsValid(datum.passwd, datum.letter, datum.min, datum.max)) countValid++
})

console.log('valid passwords', countValid)