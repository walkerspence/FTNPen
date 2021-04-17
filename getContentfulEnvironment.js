require('dotenv').config({ path: '.env.local' });
const contentfulManagement = require('contentful-management');

/*
  For contentful-typescript-codegen
  https://github.com/intercom/contentful-typescript-codegen#readme
*/
const getContentfulEnvironment = () => {
  const contentfulClient = contentfulManagement.createClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
  });

  return contentfulClient
    .getSpace(process.env.CONTENTFUL_ID)
    .then((space) => space.getEnvironment(process.env.CONTENTFUL_ENV));
};

module.exports = getContentfulEnvironment;
