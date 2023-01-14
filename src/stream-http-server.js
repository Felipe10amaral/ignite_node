import http from 'node:http';
import { Transform } from 'node:stream';

class InverseNumnbersStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1;
        console.log(transformed);
        
        callback(null, Buffer.from(String(transformed)))
    }
}

const server = http.createServer( (request, response) => {
    return request
        .pipe(new InverseNumnbersStream())
        .pipe(response);
})

server.listen(3300);