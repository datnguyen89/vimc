/** Use only with Antd Form */
/** Currently validator will no longer working if using regex from outside 'validator' object */

const validator = {

  validateCurrencyFormat: (rule, value, callback) => {
    const regex = /^[a-zA-Z]{3}/g
    if (value === '') {
      callback(`Must contain value`)
    } else if (!regex.test(value)) {
      callback(`Incorrect currency format. Eg: 'USD', 'EUR'`)
    }
  },

  validateFormBuilderElementTitle: (rule, value, callback) => {
    const regex = /^[a-zA-Z]+/g
    if (value !== '' && !regex.test(value)) {
      callback(`Title must start with letter & no blank space`)
    } else {
      callback()
    }
  },

  validatePhoneNumber: (rule, value, callback) => {
    const regex = /^[+]?[\s/0-9]*[(]?[0-9]{1,4}[)]?[-\s/0-9]*$/g
    if (value && !regex.test(value)) {
      callback('Not a valid phone number!')
    } else {
      callback()
    }
  },

  validateWebsite: (rule, value, callback) => {
    const regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm
    if (value && !regex.test(value)) {
      callback('Not a valid website!')
    } else {
      callback()
    }
  },

  validateEmail: (rule, value, callback) => {
    const regex = /^[A-Za-z][A-Za-z0-9_\.]{1,32}(\+?[0-9]){0,5}@[A-Za-z0-9]{2,}(\.[A-Za-z0-9]{2,4}){1,2}$/gm
    if (value && !regex.test(value)) {
      callback('Not a valid email!')
    } else {
      callback()
    }
  },

  validateEmptyString: (rule, value, callback) => value && value.trim() === ''
    ? callback('Must contain a letter')
    : callback(),

  validateIntergerNumber: (rule, value, callback) => {
    if (value && !Number.isInteger(value)) {
      callback('Not an interger or valid number')
    } else if (value && value < 0) {
      callback('Not accept negative number')
    } else {
      callback()
    }
  },

  validateNumber: (rule, value, callback) => {
    const regex = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/g
    if (value && value.trim() === '') {
      callback('Must have a number')
    } else if (isNaN(value) && value !== '' && value !== undefined) {
      callback(`Not a number`)
    } else if (value !== '' && value !== undefined && regex.test(value) === false) {
      callback(`Incorrect number format. Remove leading 0, blank spaces or any special letters`)
    } else if (value < 0) {
      callback(`Must be greater than 0`)
    } else {
      callback()
    }
  },
}

export default validator