import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  preset: 'react-native',
  setupFiles: [
    './src/tests/setup.ts',
    './node_modules/react-native-gesture-handler/jestSetup.js',
  ],
  transformIgnorePatterns: ['/node_modules/(?!native-base)/'],
  testEnvironment: 'node',
};
export default config;
