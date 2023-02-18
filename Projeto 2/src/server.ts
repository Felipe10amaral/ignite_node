import fastify from "fastify";

const server = fastify();


server.get("/server", () => {
    return "Hello ";
})

server.listen({
port: 2000 
}).then(() => {console.log("Server is running on port 2000")
})