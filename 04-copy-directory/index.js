const fs = require('fs');
const path = require('path');

console.log('start')

const sourcePath = path.resolve(__dirname, 'files');
const destPath = path.resolve(__dirname, 'files-copy')

fs.mkdir(destPath, {recursive: true}, err => {
    if (err) throw err;
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

copyDir(sourcePath, destPath)

/*fs.mkdir(destPath, {recursive: true}, err => {
    if (err) throw err;
})
console.log(path.join(sourcePath, 'test-css.css'))
console.log(path.join(destPath, 'test-css.css'))
fs.copyFile(path.join(sourcePath, 'test-css.css'),
    path.join(destPath, 'test-css.css'), (err) => {
        if (err) throw err;
    })*/