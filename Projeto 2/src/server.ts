import fastify from "fastify";
import { nex } from "./database";
import { env } from "./env";
import { registerTransactions } from "./routes/transaction";

const server = fastify();

server.register(registerTransactions)

server.listen({
port: env.PORT
}).then(() => {console.log("Server is running on port 2000")
})