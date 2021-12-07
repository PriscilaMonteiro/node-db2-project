const yup = require('yup')

const carSchema = yup.object().shape({
  vin:yup
    .string()
    .typeError('vin needs to be a string')
    .required('vin is missing'),
  make:yup
    .string()
    .typeError('make needs to be a string')
    .required('make is missing'),
  model:yup
    .string()
    .typeError('model needs to be a string')
    .required('model is missing'),
  mileage:yup
    .number()
    .typeError('mileage needs to be a positive number')
    .positive()
    .required('mileage is missing'),
  title:yup
    .string()
    .typeError('title needs to be a string'),
  transmission:yup
    .string()
    .typeError('transmission needs to be a string'),
})

module.exports = {
  carSchema,
}