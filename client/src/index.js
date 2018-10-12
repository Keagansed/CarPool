import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import lime from '@material-ui/core/colors/lime';
import red from '@material-ui/core/colors/red';

import App from './js/App';

import registerServiceWorker from './js/registerServiceWorker';

//Set Default Material UI Theme for entire app
const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: lime,
        secondary: {
            main: '#C4765C',//3 options: C4765C (white-red), A2652E (brown-red), D27A1D (bright-orange)
        },
        error: red,
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
});

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <App />
    </MuiThemeProvider>
    , document.getElementById('root')
);


registerServiceWorker();
