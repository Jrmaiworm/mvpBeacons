import 'react-native-gesture-handler';

import { ErrorBoundary } from '~/components';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import React from 'react';
import { Routes } from '~/Routes';
import { ThemeProvider } from 'styled-components';
import getPermissions from '~/utils/helpers/getPermissions';
import { store } from '~/redux/store';
import { theme } from '~/theme';
import NoConnectionModal from '~/components/no-connection-modal';

LogBox.ignoreAllLogs();

const App: React.FC = () => {
  React.useEffect(() => {
    getPermissions();
  }, []);

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <NoConnectionModal />
          <Routes />
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
