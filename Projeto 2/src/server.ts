import fastify from "fastify";
import { nex } from "./database";
import { env } from "./env";

const server = fastify();


server.get("/server", async () => {

   const transaction = await nex('transactions').select('*')

   console.log(transaction)

   return transaction
})

server.listen({
port: env.PORT
}).then(() => {console.log("Server is running on port 2000")
})