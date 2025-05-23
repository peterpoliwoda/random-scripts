#!/usr/bin/env node
// Import necessary modules
const fs = require('fs'); // For file system operations
const csvtojson = require('csvtojson'); // For CSV to JSON conversion

/**
 * Converts a CSV file to a JSON file.
 * @param {string} csvFilePath - The path to the input CSV file.
 * @param {string} jsonFilePath - The path where the output JSON file will be saved.
 */
async function convertCsvToJson(csvFilePath, jsonFilePath) {
    try {
        // Check if the CSV file exists
        if (!fs.existsSync(csvFilePath)) {
            console.error(`Error: CSV file not found at ${csvFilePath}`);
            // Exit with an error code
            process.exit(1);
        }

        console.log(`Converting CSV from ${csvFilePath} to JSON at ${jsonFilePath}...`);

        // Convert CSV to JSON using csvtojson library
        // The fromFile method directly takes the file path and returns a promise
        const result = await csvtojson().fromFile(csvFilePath);

        // Write the JSON data to a file
        fs.writeFileSync(jsonFilePath, JSON.stringify(result, null, 2));

        console.log('Conversion complete! JSON data saved successfully.');
    } catch (error) {
        console.error('An error occurred during conversion:', error.message);
        // Exit with an error code
        process.exit(1);
    }
}

// --- How to use the script ---
// 1. Make sure you have Node.js installed.
// 2. Install the 'csvtojson' package: npm install csvtojson
// 3. Create a sample CSV file (e.g., 'input.csv') in the same directory as this script.
//    Example 'input.csv' content:
//    name,age,city
//    Alice,30,New York
//    Bob,24,London
//    Charlie,35,Paris

// Process command-line arguments
const args = process.argv.slice(2); // Get arguments after 'node script.js'

let inputCsvFile = 'input.csv'; // Default input file
let outputJsonFile = 'output.json'; // Default output file

// Check for arguments
if (args.length === 0) {
    console.log('Usage: ./csvConverter.js <input.csv> [output.json]');
    console.log('Using default files: input.csv and output.json');
} else if (args.length === 1) {
    inputCsvFile = args[0];
    console.log(`Using input file: ${inputCsvFile}, default output file: ${outputJsonFile}`);
} else if (args.length === 2) {
    inputCsvFile = args[0];
    outputJsonFile = args[1];
    console.log(`Using input file: ${inputCsvFile}, output file: ${outputJsonFile}`);
} else {
    console.error('Error: Too many arguments provided.');
    console.log('Usage: ./csvConverter.js <input.csv> [output.json]');
    process.exit(1); // Exit with an error code
}

// Call the conversion function
convertCsvToJson(inputCsvFile, outputJsonFile);

