exports.up = function (knex) {
  return knex.schema.createTable('incidents', (table) => {
    table.increments();
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.decimal('value').notNullable();

    table.string('ong_uuid').notNullable();
    table.foreign('ong_uuid').references('uuid').inTable('ongs');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('incidents');
};
