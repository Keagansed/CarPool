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
        //#4C7E7D
        //#8E554F
        type: 'dark',
        primary: lime,
        secondary: {
            main: '#aaaaaa',
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
