const fs = require('node:fs');
const path = require('node:path');

const filePath = path.resolve('01-read-file/text.txt');

const reader = fs.createReadStream(filePath);
reader.on('data', function (chunk) {
    console.log(chunk.toString());
})