const fs = require('fs');
const path = require('path');

console.log('start')

const sourcePath = path.resolve(__dirname, 'files');
const destPath = path.resolve(__dirname, 'files-copy')

fs.stat(destPath, function (err) {
    if (err) {
        fs.mkdir(destPath, {recursive: true}, err => {
            if (err) throw err;
        })
        copyDir(sourcePath, destPath)
    } else {
        fs.rmdir(destPath, {recursive: true}, function (err) {
            if (err) throw err;
            fs.mkdir(destPath, {recursive: true}, err => {
                if (err) throw err;
                copyDir(sourcePath, destPath)
            })
        })
    }
})

function copyDir(pathFrom, pathTo) {
    fs.readdir(pathFrom, function (err, files) {
        for (let i = 0; i < files.length; i++) {
            const filePath = path.join(pathFrom, files[i]);
            const newPathTo = path.join(pathTo, files[i]);
            //console.log('from ' + filePath + ' to ' + newPathTo)
            fs.stat(filePath, (error, stats) => {
                if (stats.isFile()) {
                    fs.copyFile(filePath, newPathTo, (err) => {
                        if (err) throw err;
                    })
                } else {
                    fs.mkdir(newPathTo, {recursive: true}, err => {
                        if (err) throw err;
                    })
                    copyDir(filePath, newPathTo);
                }
            })
            console.log(files[i])
        }
    })
}