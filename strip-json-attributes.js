const fs = require('fs');
const argv = require('yargs').argv

if (argv.file && argv.attributes) {
    const fileName = argv.file;
    const attributes = argv.attributes;

    attributesArray = attributes.split(',');

    try {
        const jsonFile = fs.readFileSync(fileName);
        parseFile(jsonFile, attributesArray, fileName);
    } catch (err) {
        console.error('Error reading file! Did the landlubber get away to the shore?')
    }
} else {
  console.log(`
  ## Strip JSON Attributes ##
  This utility helps to remove fields from a JSON File in an array format [{Objects1}, {Object2}, ...].
  Provide the file name of the file you'd like to strip and a list of attributes you'd like to remove as a comma separated list as in example below. This script creates a copy of the file with a "..._stripped.json" suffix.

  Usage: node strip-json-attributes.js --file=file.json --attributes=attr1,attr2
  `);
}

function parseFile(jsonFile, attributes, saveAsFileName) {
    try {
        const parsedJson = JSON.parse(jsonFile);

        console.log('Yarrg! Stripping yer json file off of its scallywag attributes!');
        let strippedData = [];

        let amountOfStrippedAttributes = 0;
        if (Array.isArray(parsedJson)) {
            for (let obj of parsedJson) {

                for (let singleAttr of attributes) {
                    if (obj[singleAttr]) {
                        delete obj[singleAttr];
                        amountOfStrippedAttributes += 1;
                    }
                }
                strippedData.push(obj);
            }

            const strippedString = JSON.stringify(strippedData);

            saveAsFileName = saveAsFileName.split('.json')[0];
            fs.writeFileSync(saveAsFileName + '_stripped.json', strippedString);

            console.log(`Stripped ${amountOfStrippedAttributes} attributes.`);
        }
    } catch (err) {
        console.error('Error anonymising data, check yer file fer hidden trreasures!', err);
    }
}