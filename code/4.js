// first, read in the data for today. Don't worry about size.
const fs = require('fs')
const path = require('path')
let data

// synchronous, because let's bail if we can't read
try {
	data = fs.readFileSync(path.resolve(__dirname, '../input/4.txt'), 'utf8')
} catch (err) {
	console.error(err)
}

// Clean the textdata into a set of passports. Each passport should be an object with standardized fields.
data = data.split("\n\n") //Different entries have a blank line between them

let thisPassport, key, val, passports = data.map(record => {
	record = record.replace(/\n/g, ' ') // some fields are split by " ", some by newline
	record = record.split(' ')
	thisPassport = {} // Empty passport record
	record.forEach(datum =>{
		key = datum.split(":")[0]
		val = datum.split(":")[1]
		thisPassport[key] = val
	})
	return thisPassport
})

const requiredFields = ['byr',
	'iyr',
	'eyr',
	'hgt',
	'hcl',
	'ecl',
	'pid'] // cid is *not* required per instructions

const requiredFieldsLen = requiredFields.length

// Probably shouldn't use regex to do all this, but it's faster than building a robust validation system
const validations = {
	byr: '200[0,1,2]|19[2-9]\\d',
	iyr: '202[0]|201\\d',
	eyr: '202[0-9]|2030',
	hgt: '6\\din|59in|7[0-6]in|1[5-8]\\dcm|19[0-3]cm',
	hcl: '\#(\\d|[abcdef]){6}',
	ecl: '^amb$|^blu$|^brn$|^gry$|^grn$|^hzl$|^oth$',
	pid: '^\\d{9}$'
}
let i, invalidPassports = 0

// Is the field's value valid, per the validations above?
function checkValid(field, value) {
	let re = new RegExp(validations[field], 'g')
	let matches = value.match(re)
	if (matches && matches.length) return true
	return false
}

// check if the required fields exist and have the right value
passports.forEach(passport => {
	for (i = 0; i < requiredFieldsLen; i++) {
		if (!passport[requiredFields[i]]) {
			// missing a required field? Go on to the next one
			invalidPassports++
			break
		} else if (passport[requiredFields[i]] && !checkValid(requiredFields[i], passport[requiredFields[i]])) {
			// Has a field but also an invalid value. Go on to the next one
			invalidPassports++
			// console.log('failed validation for', requiredFields[i])
			break
		}
		// Everything is good, don't count anything
	}
})

let validPassports = passports.length - invalidPassports

console.log(validPassports)