import fastify from "fastify";
import { nex } from "./database";
import crypto from 'node:crypto';

const server = fastify();


server.get("/server", async () => {

   const transaction = await nex('transactions').select('*')

   console.log(transaction)

   return transaction
})

server.listen({
port: 2000 
}).then(() => {console.log("Server is running on port 2000")
})