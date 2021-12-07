const db = require('../../data/db-config')
const Car = require('./cars-model')
const {carSchema} = require('./schema')
var vinValidator = require('vin-validator')

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
      next({ status:404, message: `car with id ${id} is not found`})
    }
  } catch (err) {
    next(err);
  }
}


async function checkCarPayload(req, res, next) {
  try {
    const validated = await carSchema.validate(
      req.body,
      { strict: false, stripUnknown: true }
    )
    req.body = validated
    next();
  } catch (err) {
    next({ message: `${err.message}`, status: 400 });
  }
}

async function checkVinNumberValid(req, res, next) {
  const { vin } = req.body;
  try {
    const validatedVin = await Car.getById(vin)
    if (!validatedVin) {
      next({ status: 400, message: `vin ${vin} is invalid` })
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

async function checkVinNumberUnique(req, res, next) {
  const { vin } = req.body;
  try {
    const notUniqueVin = await db('cars')
      .where('vin', vin)
      .first()
    if (notUniqueVin) {
      next({ status: 400, message: `vin ${vin} already exists` })
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}


module.exports = {
  handleError,
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
}
