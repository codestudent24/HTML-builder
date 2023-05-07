const fs = require('fs');
const path = require('path')

console.log('start')

const folderPath = path.resolve(__dirname, 'secret-folder');

fs.readdir(folderPath,
    {withFileTypes: true},
    (err, files) => {
        if (err)
        console.log(err);
      else {
        files.forEach(file => {
            const filePath = path.join(folderPath, file.name)
            fs.stat(filePath, (error, stats) => {
                if (stats.isFile()) {
                    console.log (`${path.basename(filePath).split('.')[0]} - ${path.extname(filePath)} - ${stats.size} bytes`)
                }
            })
        })
      }
    })