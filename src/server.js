import http from 'http';
import { Database } from './database.js';
import { json } from './middleware/json.js'

const database = new Database();

const server = http.createServer( async (req, res) => {

    const {method, url} = req;

    await json(req, res);
    
    if (method === 'GET' && url === '/users'){
        const users = database.select('users')

        return users;
    }

    if(method === 'POST' && url === '/users'){
        const {name, email} = req.body;

        const user = {
            id: 1,
            name, 
            email,

        }

        database.insert('users', user);
        return res.writeHead(201).end()
    }
})

server.listen(3330);


