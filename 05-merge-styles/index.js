const fs = require('fs');
const path = require('path');

console.log('start')

stylesPath = path.join(__dirname, 'styles');

fs.writeFile(path.join(__dirname, 'bundle.css'), '', (err) => {
    if (err) console.log('error :' + err)
})

function copyStyles(pathFrom) {
    fs.readdir(pathFrom, function (err, files) {
        for (let i = 0; i < files.length; i++) {
            const filePath = path.join(pathFrom, files[i]);
            const ext = path.extname(filePath);

            fs.stat(filePath, (error, stats) => {
                if (stats.isFile() && ext === '.css') {
                    fs.readFile(filePath, {encoding: 'utf-8'}, (err, data) => {
                        if (err) {
                            throw err;
                        } else {
                            fs.appendFile(path.join(__dirname, 'bundle.css'), data, (err) => {
                                if (err) console.log('error :' + err)
                            })
                        }
                    })
                }
            })
        }
    })
}

copyStyles(stylesPath)