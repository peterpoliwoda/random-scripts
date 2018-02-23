const fs = require('fs');
const charLimit = process.argv[2] || 18588430;
const fileName = process.argv[3] || '18mbs.please';
const helpParams = ['help', '-h', '--help', '-help'];

function generateRandomChars() {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (var i = 0; i < charLimit; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function generateRandomCharFile() {
    let fileContent = generateRandomChars();
    fs.writeFile(fileName, fileContent);
}

function showHelp() {
    console.log('### RANDOM CHAR FILE GENERATOR ### \n');
    console.log('Usage: ');
    console.log('$ node generate-random-char-file.js [charNumberLimit] [fileName]');
    console.log('$ ...  --help     Show this help \n');
}

if (process.argv[2] && ~helpParams.indexOf(process.argv[2])) {
    showHelp();
} else {
    generateRandomCharFile();
    console.log('Generated file: ' + fileName + ' with ' + charLimit + ' characters.');
}
