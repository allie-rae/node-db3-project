const db = require('../data/db-config');

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
}

function find() {
    return db('schemes');
}

function findById(id) {
    return db('schemes').where({ id }).first();
}

function findSteps(id) {
    return db('steps')
        .where({ scheme_id: id })
        .join('schemes', 'steps.scheme_id', 'schemes.id')
        .select('schemes.scheme_name', 'steps.step_number', 'steps.instructions')
}

function add(schemeData) {
    return db('schemes')
        .insert(schemeData, 'id')
        .then(ids => {
            const [id] = ids;
            return findById(id)
        })
}

function update(changes, id) {
    return db('schemes')
        .where('schemes.id', id)
        .update(changes)
}

function remove(id) {
    return db('schemes')
    .where('schemes.id', id)
    .del()
}