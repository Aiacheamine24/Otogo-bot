// External imports
const fs = require('fs');

// Internal imports
const {
  getCarsSectionsHardCoded,
  extractCarsData,
} = require('../utils/getDataFunctions');

// Variables

// Here start collect Cars data
exports.getCarsData = async (page) => {
  try {
    // Get all sections
    const sections = await getCarsSectionsHardCoded(page);

    // Archive sections to txt file on separatings sections by \n without deleting old data
    fs.appendFileSync(
      `${__dirname}/../_data/sections.txt`,
      sections.join('\n').toString()
    );

    // Extract data from each section
    const carsData = await extractCarsData(sections);

    // Read old Data From Json File and add new data to it
    const oldData = JSON.parse(
      fs.readFileSync(`${__dirname}/../_data/carsData.json`)
    );
    const newData = [...oldData, ...carsData];
    // Write new and Old data to json file
    fs.writeFileSync(
      `${__dirname}/../_data/carsData.json`,
      JSON.stringify(newData)
    );

    // Return all data
    return newData.length;
  } catch (error) {
    console.log(error);
  }
};
