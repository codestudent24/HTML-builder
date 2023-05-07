const fs = require('fs');
const path = require('path');

console.log('start')

const sourcePath = path.resolve(__dirname, 'files');
const destPath = path.resolve(__dirname, 'files-copy')

function copyDir(pathFrom, pathTo) {
    fs.readdir(pathFrom, function (err, files) {
        for (let i = 0; i < files.length; i++) {
            const filePath = path.join(pathFrom, files[i]);
            const newPathTo = path.join(pathTo, files[i]);
            console.log('from ' + filePath + ' to ' + newPathTo)
            fs.stat(filePath, (error, stats) => {
                if (stats.isFile()) {
                    fs.copyFile(filePath, newPathTo)
                } else {
                    copyDir(filePath, newPathTo);
                }
            })
            console.log(files[i])
        }
    })
}

copyDir(sourcePath, destPath)