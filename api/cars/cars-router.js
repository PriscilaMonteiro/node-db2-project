const express = require('express')
const db = require('../../data/db-config')
const router = express.Router()

const {
  handleError,
  checkCarId,
} = require('./cars-middleware')

const Cars = require('./cars-model')

router.get('/', (req, res, next) => {
  Cars.getAll()
    .then((cars) => {
      res.status(200).json(cars);
    })
    .catch(next);
})


router.get('/:id', checkCarId, (req, res, next) => {
  res.status(200).json(req.car);
})



router.use(handleError)

module.exports = router;
