const db = require('../../data/db-config')
const Car = require('./cars-model')
const yup = require('yup')

// eslint-disable-next-line no-unused-vars
function handleError(err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
  })
}

async function checkCarId (req, res, next) {
  try{
    const { id } = req.params
    const car = await Car.getById(id)
    if(car){
      req.car = car
      next()
    } else {
      next({ status:404, message: 'car not found'})
    }
  } catch (err) {
    next(err);
  }
}


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



const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
}

const checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
}

module.exports = {
  handleError,
  checkCarId,
}
