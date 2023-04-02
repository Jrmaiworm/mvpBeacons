/* eslint-disable global-require */

import {
  BASE_PATH,
  DEBUG_API_NEVER_PRODUCTION,
  IMAGES_PATH,
  IMAGES_PATH_NO_PROTOCOL,
  ROOT_FOLDER,
  URL,
} from 'react-native-dotenv';

// DEV
export const routes = {
  URL: `https://apiconta-bancosimpla.devrbm.top/contadigital/`,
  ROOT_FOLDER,
  basePath: 'https://apiconta-bancosimpla.devrbm.top',
  imagesPath: `https://apiconta-bancosimpla.devrbm.top/contadigital/`,
  imagesPathNoProtocol: `https://apiconta-bancosimpla.devrbm.top/contadigital/`,
};

// CANARY
// export const routes = {
//   URL: `https://bancosimpla.apicanary.aplicativo.digital/contadigital/`,
//   ROOT_FOLDER,
//   basePath: 'https://bancosimpla.apicanary.aplicativo.digital',
//   imagesPath: `https://bancosimpla.apicanary.aplicativo.digital/`,
//   imagesPathNoProtocol: `https://bancosimpla.apicanary.aplicativo.digital/`,
// };

// export const DEBUG_API = true;

// export const routes = {
//   URL,
//   rootFolder: ROOT_FOLDER,
//   basePath: BASE_PATH,
//   imagesPath: IMAGES_PATH,
//   imagesPathNoProtocol: IMAGES_PATH_NO_PROTOCOL,
// };

export const DEBUG_API = DEBUG_API_NEVER_PRODUCTION;

export { default as LOGO1 } from './src/images/company_logo.png';
export { default as logo } from './src/images/company_logo_alt.png';
export { default as logoText } from './src/images/company_logo_text.png';
export { default as logoTextAlt } from './src/images/company_logo_text_alt.png';
