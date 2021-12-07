exports.up = function (knex, Promise) {
  return knex.schema.createTable('cars', table => {
    table.increments('id')
    table.text('vin', 128)
      .unique()
      .notNullable()
    table.text('make', 128)
      .notNullable()
    table.text('model', 128)
      .notNullable()
    table.integer('mileage')
      .notNullable()
    table.text('title', 128)
    table.text('transmission')

  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('cars')
};
