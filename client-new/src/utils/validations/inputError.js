import {stringValidation, numberValidation, asbNumberValidation, emailValidation, booleanValidation, imageValidation, arrayValidation} from './inputValidations';

export const handleError = (data) => {
  const {name, value, object } = data;
  const {required, type, condition} = object;
  const {main, secondary} = type;

  let min, max, size, dimensions, image_type;;
  if (type.name !== 'Image') {
    min = condition.min;
    max = condition.max;
  } else {
    size = condition.size;
    dimensions = condition.dimensions;
    image_type = condition.type;
  }

  let error_obj = {};
  if (main === 'String') {
    error_obj = stringValidation(name, value, required, min, max, secondary);
  } else if (main === 'Number') {
    error_obj = numberValidation(name, value, required, min, max);
  } else if (main === 'AbsNumber') {
    error_obj = asbNumberValidation(name, value, required, min, max);
  } else if (main === 'Email') {
    error_obj = emailValidation(name, value, required);
  } else if (main === 'Boolean') {
    error_obj = booleanValidation(name, value, required);
  } else if (main === 'Image') {
    error_obj = imageValidation(name, value, required, size, dimensions, image_type);
  } else if (main === 'Array') {
    error_obj = arrayValidation(name, value, required, min, max);
  }

  return error_obj;
}