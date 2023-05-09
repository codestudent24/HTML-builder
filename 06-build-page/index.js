const fs = require('fs');
const path = require('path');

console.log('start')

const sourcePath = path.join(__dirname, 'assets');
const destPath = path.join(__dirname, 'project-dist')

fs.mkdir(path.join(destPath), {recursive: true}, err => {
    if (err) throw err;
})

fs.mkdir(path.join(destPath, 'assets', 'fonts'), {recursive: true}, err => {
    if (err) throw err;
})

fs.mkdir(path.join(destPath, 'assets', 'img'), {recursive: true}, err => {
    if (err) throw err;
})

fs.mkdir(path.join(destPath, 'assets', 'svg'), {recursive: true}, err => {
    if (err) throw err;
    copyDir(sourcePath, path.join(destPath, 'assets'))
})

// copy assets folder
function copyDir(pathFrom, pathTo) {
    fs.readdir(pathFrom, function (err, files) {
        for (let i = 0; i < files.length; i++) {
            const filePath = path.join(pathFrom, files[i]);
            const newPathTo = path.join(pathTo, files[i]);
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
        }
    })
}

const componentsPath = path.join(__dirname, 'components');
const stylesPath = path.join(__dirname, 'styles')

function copyStyles(stylesPath) {
    const newCSS = path.join(destPath, 'style.css')

    fs.readFile(newCSS, {encoding: 'utf-8'}, (err, data) => {
        if (err) throw err;

        fs.readdir(stylesPath, function (err, files) {

            for (let i = 0; i < files.length; i++) {

                const filePath = path.join(stylesPath, files[i]);

                fs.stat(filePath, (error, stats) => {
                    if (error) throw error;
                    if (stats.isFile() && path.extname(filePath) === '.css') {

                            fs.readFile(path.join(stylesPath, files[i]), {encoding: 'utf-8'}, (err, t) => {
                                if (err) throw err;
                                data += t + '\n';

                                if (i === files.length - 1) {
                                    fs.writeFile(newCSS, data, (err) => {
                                        if (err) throw err;
                                    })
                                }
                            })
                    }
                })
            }
        })
    })
}


function templateAll(componentsPath) {
    const newHTML = path.join(destPath, 'index.html')

    fs.readFile(newHTML, {encoding: 'utf-8'}, (err, data) => {
        if (err) throw err;

        fs.readdir(componentsPath, function (err, files) {

            for (let i = 0; i < files.length; i++) {

                const filePath = path.join(componentsPath, files[i]);

                fs.stat(filePath, (error, stats) => {
                    if (error) throw error;
                    if (stats.isFile() && path.extname(filePath) === '.html') {
                        const tempName = files[i].split('.')[0];

                            fs.readFile(path.join(componentsPath, files[i]), {encoding: 'utf-8'}, (err, t) => {
                                if (err) throw err;
                                data = data.replace(`{{${tempName}}}`, t)

                                if (i === files.length - 1) {
                                    fs.writeFile(newHTML, data, (err) => {
                                    if (err) throw err;
                                    })
                                }
                            })
                    }
                })
            }
        })
    })
}

fs.writeFile(path.join(destPath, 'index.html'), '', (err) => {
    if (err) throw err;
    fs.copyFile(path.join(__dirname, 'template.html'), path.join(destPath, 'index.html'), (err) => {
        if (err) throw err;
        templateAll(componentsPath)
    })
})

fs.open(path.join(destPath, 'style.css'), 'w', (err) => {
    if (err) throw err;
    copyStyles(stylesPath);
})

