import knex from 'knex';

export const nex = knex({
    client: 'sqlite',
    connection: {
        filename: './tmp/app.db'
    }
});