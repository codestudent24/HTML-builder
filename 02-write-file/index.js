const fs = require('fs');
const path = require('path');
const process = require('node:process');
const readline = require('node:readline/promises');
const {stdin: input, stdout: output} = require ('node:process')

process.on('exit', () => {
    console.log('Файл записан')
})

const writableStream = fs.createWriteStream(path.resolve(__dirname, 'file.txt'))
const r1 = readline.createInterface( {input, output});

r1.on('line', (input) => {
    if (input === 'exit') {
        r1.close();
    } else {
        console.log(`Сообщение: "${input}" добавлено в файл, введите текст для добавления в файл:`)
        writableStream.write(`${input}`)
    }
})

writableStream.write('')
console.log('Привет, введи текст для добавления в файл: ')