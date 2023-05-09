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

async function copyStyles(stylesPath) {
    const newCSS = path.join(destPath, 'style.css')
    await fs.promises.writeFile(newCSS, '', 'utf8');

    const files = await fs.promises.readdir(stylesPath);
    for (let i=0; i<files.length; i++) {
        const filePath = path.join(stylesPath, files[i]);
        const stats = await fs.promises.stat(filePath);

        if (stats.isFile() && path.extname(filePath) === '.css') {
            const styleChunk = await fs.promises.readFile(filePath, 'utf8');
            await fs.promises.appendFile(newCSS, styleChunk, 'utf8');
        }
    }
}


async function templateAll(componentsPath) {
    const newHTML = path.join(destPath, 'index.html')

    let data = await fs.promises.readFile(path.join(__dirname, 'template.html'), 'utf8');
    const files = await fs.promises.readdir(componentsPath);
    for (let i=0; i<files.length; i++) {
        const filePath = path.join(componentsPath, files[i]);
        const tempName = files[i].split('.')[0];
        const stats = await fs.promises.stat(filePath);

        if (stats.isFile() && path.extname(filePath) === '.html') {
            const template = await fs.promises.readFile(path.join(componentsPath, files[i]), 'utf8');
            data = data.replace(`{{${tempName}}}`, template)
        }
    }
    await fs.promises.writeFile(newHTML, data, 'utf8');
}

fs.open(path.join(destPath, 'index.html'), 'w', (err) => {
    if (err) throw err;
    templateAll(componentsPath)
})

fs.open(path.join(destPath, 'style.css'), 'w', (err) => {
    if (err) throw err;
    copyStyles(stylesPath);
})