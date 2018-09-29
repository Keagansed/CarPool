import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import App from './js/App';

import registerServiceWorker from './js/registerServiceWorker';

//Set Default Material UI Theme for entire app
const theme = createMuiTheme({
    palette: {
        type: 'light',
    }
});

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <App />
    </MuiThemeProvider>
    , document.getElementById('root')
);


registerServiceWorker();
