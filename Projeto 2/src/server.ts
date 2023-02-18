import fastify from "fastify";
import { nex } from "./database";

const server = fastify();


server.get("/server", async () => {

    const test = nex('sqlite_schema').select('*');
    console.log(test);
    return test;
})

server.listen({
port: 2000 
}).then(() => {console.log("Server is running on port 2000")
})