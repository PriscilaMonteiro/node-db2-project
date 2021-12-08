const express = require('express')
const db = require('../../data/db-config')
const router = express.Router()

const {
  handleError,
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid,
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

router.post('/', checkCarPayload, checkVinNumberUnique, checkVinNumberValid ,(req, res, next) => {
  Cars.create(req.body)
    .then(newCar => {
      res.status(201).json(newCar);
    })
    .catch(next);
})

router.put(
  '/:id', 
  checkCarId, 
  checkCarPayload,
  checkVinNumberValid,
  (req, res, next) => {
    Cars.updateById(req.params.id, req.body)
      .then(updated => {
        res.status(200).json(updated)
      })
      .catch(next);
})

// router.delete('/:id', checkCarId, (req, res, next) => {
//   Cars.deleteById(req.params.id)
//     .then(() =>{
//       res.status(200).json({});
//     })
//     .catch(next);
// })

router.delete('/:id', checkCarId, async (req, res, next) => {
  try {
    const data = await Cars.deleteById(req.params.id)
    res.json(data)
  } catch (err) {
    next(err)
  }
})



router.use(handleError)

module.exports = router;
