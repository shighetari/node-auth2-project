const db = require('../database/connection')

module.exports = {
    find,
    findById,
    findBy,
    register,
    login


}

function find() {
    return db('users')
    .select('users.id' ,'users.username', 'users.department' )
}

function findById(id) {
    return db('users')
    .where({id})
    .first()
    .select('users.id', 'users.username')
}

function findBy(username) {
    return db('users')
    .where(username)
    .select('users.id', 'users.username')
    .orderBy('users.id')
}
function register(user) {
    return db('users')
    .insert(user, 'id')
    .then( ([id]) => {
        return findById(id)
    })

}

function login(username) {
    return db('users')
    .where(username)
    .select('users.id', 'users.username', 'users.password')
    .orderBy('users.id')
}