
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'ThisIsASeedNotHash', password: "seedusers", department: 'test'},
        {username: 'seededUser', password: "seedusers", department: 'admin'},
        {username: 'seed', password: "seedusers", department: 'user'}
      ]);
    });
};
