import {formateKeyName, keyValueErrorObject} from './errorMessages';
const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validateAlpha = RegExp(/^[a-zA-Z ]*$/);
const validateAlphaNumeric = RegExp(/^[a-zA-Z0-9 ]*$/);
const validateAlphaNumericBasic = RegExp(/^[a-zA-Z0-9-,!&@ ]*$/);
const validateNumeric = RegExp(/^[0-9]*$/);

export const stringValidation = (key, value, required, min, max, secondary) => {
  if (value || required) {
    if (required && !value) return keyValueErrorObject(key, `${formateKeyName(key)} is required`)
    if (secondary === 'Alpha') {
      if (!validateAlpha.test(value)) return keyValueErrorObject(key, `${formateKeyName(key)} should only contain alphabets`);
    }
    if (secondary === 'AlphaNumeric') {
      if (!validateAlphaNumeric.test(value)) return keyValueErrorObject(key, `${formateKeyName(key)} should only contain alphabets`);
    }
    if (secondary === 'AlphaNumericBasic') {
      if (!validateAlphaNumericBasic.test(value)) return keyValueErrorObject(key, `${formateKeyName(key)} should only contain alphabets`);
    }
    if (typeof(value) === 'string') {
      if (!(value.length >= min && value.length <= max)) {
        if (min === max) return keyValueErrorObject(key, `${formateKeyName(key)} should be ${min} characters long`)
        return keyValueErrorObject(key,`${formateKeyName(key)} should be between ${min} and ${max} characters long` )
      }
      return '';
    } else {
      return keyValueErrorObject(key, `${formateKeyName(key)} should be a characters`)
    }
  } else {
    return '';
  }
}

export const numberValidation = (key, value, required, min, max) => {
  if (value || require) {
    if (required && !value) return keyValueErrorObject(key, `${formateKeyName(key)} is required`)
    if (!validateNumeric.test(value)) return keyValueErrorObject(key, `${formateKeyName(key)} should only contain numbers`);
    if (typeof(value) === 'number') {
      if (!(value.toString().length >= min && value.toString().length <= max)) {
        if (min === max) return keyValueErrorObject(key, `${formateKeyName(key)} should be ${min} digits long`)
        return keyValueErrorObject(key,`${formateKeyName(key)} should be between ${min} and ${max} digits long` )
      }
      return '';
    } else {
      return keyValueErrorObject(key, `${formateKeyName(key)} should be a numbers`)
    }
  } else {
    return '';
  }
}

export const asbNumberValidation = (key, value, required, min, max) => {
  if (value || require) {
    if (required && !value) return keyValueErrorObject(key, `${formateKeyName(key)} is required`)
    if (!validateNumeric.test(value)) return keyValueErrorObject(key, `${formateKeyName(key)} should only contain numbers`);
    if (typeof(value) === 'number') {
      if (!(value >= min && value <= max)) {
        return keyValueErrorObject(key,`${formateKeyName(key)} should be between ${min} and ${max}` )
      }
      return '';
    } else {
      return keyValueErrorObject(key, `${formateKeyName(key)} should be a numbers`)
    }
  } else {
    return '';
  }
}

export const emailValidation = (key, value, required) => {
  if (value || required) {
    if (required && !value) return keyValueErrorObject(key, `${formateKeyName(key)} is required`)
    if (!validEmailRegex.test(value)) return keyValueErrorObject(key, `${formateKeyName(key)} should be a valid email`)
    return '';
  } else {
    return '';
  }
}

export const booleanValidation = (key, value, required) => {
  if (value || required) {
    if (required && !value) return keyValueErrorObject(key, `${formateKeyName(key)} is required`)
    if (typeof(value) !== 'boolean') return keyValueErrorObject(key, `${formateKeyName(key)} should be either true or false`);
    return '';
  } else {
    return '';
  }
}

export const imageValidation = (key, value, required, size) => {
  if (required || value) {
    if (!value) return keyValueErrorObject(key, `${formateKeyName(key)} is required`)
    if (size * 1000 * 1000 < value.size) return keyValueErrorObject(key, `${formateKeyName(key)} size must not be greater than ${size} mb`)
    if (!value.name.match(/\.(png|jpeg|jpg)$/)) return keyValueErrorObject(key, `${formateKeyName(key)} should be only of png, jpeg & jpeg`)
    return '';
  } else {
    return '';
  }
}

export const arrayValidation = (key, value, required, min, max) => {
  if (!Array.isArray(value)) return keyValueErrorObject(key, `${formateKeyName(key)} field should be a list`)
  if (required || value.length > 0) {
    if (!(value.length >= min && value.length <= max)) return keyValueErrorObject(key, `${formateKeyName(key)} should be not more than ${max}`)
    return ''
  } else {
    return ''
  }
}