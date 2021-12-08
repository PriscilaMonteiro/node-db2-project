const cars = [
  {
    vin: 'KNJLT06H2T6196801', 
    make: 'Ford',
    model: 'Aspire 1996',
    mileage: 200000 ,
    title: 'clean' ,
    transmission: 'automatic',
  },
  {
    vin: '2B4FK55J9KR146695', 
    make: 'Dodge',
    model: 'Caravan 1989',
    mileage: 200000 ,
    title: 'salvage' ,
    transmission: 'manual',
  },
  {
    vin: '5UXFE83507LZ40758', 
    make: 'BMW',
    model: 'X5 2007',
    mileage: 200000 ,
    title: 'clean' ,
    transmission: 'automatic',
  },
  

]

exports.cars = cars

exports.seed = function (knex, Promise) {
  return knex('cars').truncate()
    .then(function() {
      return knex('cars').insert(cars)
    })
}


