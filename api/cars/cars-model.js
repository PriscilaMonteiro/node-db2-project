const db = require('../../data/db-config')

async function  getAll () {
  const rows = await db ('cars')
    .select('id', 'vin', 'make', 'model', 'mileage', 'title', 'transmission')
    .orderBy('id')
  return rows
}

const getById = (id) => {
  return db('cars')
    .where('id', id)
    .first()
}

const create = async car => {
  const [id] = await db('cars').insert(car)
  return getById(id)
}

const updateById = async (id, car) => {
  await db('cars')
    .where('id', id)
    .update(car)
  return getById(id)
}

const deleteById = id => {
  return db('cars')
    .where('id', id)
    .del()
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
