// Variables
const allElementsSelector =
  'a.otg-card.is-hoverable.is-focusable[data-v-aeba2176]';
const imageLinkRegex = /<img data-v-aeba2176="" src="(.*?)" /;
const titleRegex = /<div[^>]+>([^<]+)<\/div>/;
const descriptionRegex =
  /<div[^>]+class="trim text-neutral-tertiary">([^<]+)<\/div>/;
const kmRegex =
  /<div data-v-aeba2176="" class="mileage caption font-medium text-neutral-secondary mr-sm">(.*?)<\/div>/;
const urlRegex = /<a data-v-aeba2176="" href="(.*?)"/;

// Here start collect Cars data
exports.getCarsSectionsHardCoded = async (page) => {
  try {
    // Get all sections
    const elementHandles = await page.$$(allElementsSelector);

    const htmlContents = [];
    // Get the html content of each section
    for (const elementHandle of elementHandles) {
      const htmlContent = await page.evaluate(
        (element) => element.outerHTML,
        elementHandle
      );
      htmlContents.push(htmlContent);
    }
    //return htmlContents;
    return htmlContents;
  } catch (error) {
    console.log(error);
  }
};

// Extract data from each section
exports.extractCarsData = async (sections) => {
  try {
    // Extract data from each section
    const carsData = [];

    for (const section of sections) {
      const imageLink = await extractDataWithRegex(section, imageLinkRegex);

      const title = await extractDataWithRegex(section, titleRegex);

      const description = await extractDataWithRegex(section, descriptionRegex);

      const extractedKm = await extractDataWithRegex(section, kmRegex);
      // Enlever les caractères spéciaux de km
      const km = parseFloat(extractedKm.replace(/[^0-9]/g, ''));

      const extractedPrice = await extractDataWithRegex(
        section,
        /<div data-v-aeba2176="" class="price font-bold">(.*?)<\/div>/
      );
      // Enlever les caractères spéciaux de price
      const price = parseFloat(extractedPrice.replace(/[^0-9]/g, ''));

      const extractUrl =
        'https://www.otogo.ca/' +
        (await extractDataWithRegex(section, urlRegex));

      carsData.push({
        imageLink,
        title,
        description,
        km,
        price,
        extractUrl,
      });
    }

    return carsData;
  } catch (error) {
    console.log(error);
  }
};

const extractDataWithRegex = async (sectionHTML, regex) => {
  try {
    const match = sectionHTML.match(regex);
    if (match && match.length > 1) {
      const value = match[1];
      return value;
    }
  } catch (error) {
    console.error(error);
  }
};
