import http from 'http';

const server = http.createServer( (request, response) => {
    return response.end("Hello Tufão")
})

server.listen(3330);


