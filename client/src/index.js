import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import App from './js/App';

import registerServiceWorker from './js/registerServiceWorker';

//Set Default Material UI Theme for entire app
const theme = createMuiTheme({
        palette: {
            theme: 'dark',
            primary1Color: "0097a7",
            primary2Color: "0097a7",
            primary3Color: "757575",
            accent1Color: "ff4081",
            accent2Color: "f50057",
            accent3Color: "ff80ab",
            textColor: "ffffff",
            secondaryTextColor: "rgba(255, 255, 255, 0.7)",
            borderColor: "rgba(255, 255, 255, 0.3)",
            disabledColor: "rgba(255, 255, 255, 0.3)",
            pickerHeaderColor: "rgba(255, 255, 255, 0.12)",
            clockCircleColor: "rgba(255, 255, 255, 0.12)",
            shadowColor: "000000"
        },
        appBar: {
            color: "0097a7"
        },
        badge: {
            textColor: "ffffff",
            primaryColor: "0097a7",
            secondaryColor: "ff4081"
        },
        bottomNavigation: {
            unselectedColor: "rgba(255, 255, 255, 0.54)",
            selectedColor: "0097a7"
        },
        card: {
            titleColor: "rgba(255, 255, 255, 0.87)",
            subtitleColor: "rgba(255, 255, 255, 0.54)"
        },
        cardMedia: {
            color: "rgba(255, 255, 255, 0.87)",
            overlayContentBackground: "rgba(0, 0, 0, 0.54)",
            titleColor: "rgba(255, 255, 255, 0.87)",
            subtitleColor: "rgba(255, 255, 255, 0.54)"
        },
        cardText: {
            textColor: "ffffff"
        },
        checkbox: {
            boxColor: "ffffff",
            checkedColor: "0097a7",
            requiredColor: "0097a7",
            disabledColor: "rgba(255, 255, 255, 0.3)",
            labelColor: "ffffff",
            labelDisabledColor: "rgba(255, 255, 255, 0.3)"
        },
        datePicker: {
            color: "0097a7",
            calendarTextColor: "ffffff",
            selectColor: "0097a7"
        },
        dialog: {
            bodyColor: "rgba(255, 255, 255, 0.6)"
        },
        dropDownMenu: {
            accentColor: "rgba(255, 255, 255, 0.3)"
        },
        enhancedButton: {
            tapHighlightColor: "000000"
        },
        flatButton: {
            textColor: "ffffff",
            color: "000000",
            disabledTextColor: "rgba(255, 255, 255, 0.3)",
            primaryTextColor: "0097a7",
            secondaryTextColor: "ff4081"
        },
        floatingActionButton: {
            color: "0097a7",
            secondaryColor: "ff4081",
            disabledTextColor: "rgba(255, 255, 255, 0.3)"
        },
        gridTile: {
            textColor: "ffffff"
        },
        icon: {
            backgroundColor: "0097a7"
        },
        inkBar: {
            backgroundColor: "ff4081"
        },
        listItem: {
            secondaryTextColor: "rgba(255, 255, 255, 0.7)",
            leftIconColor: "757575",
            rightIconColor: "757575"
        },
        menuItem: {
            hoverColor: "rgba(255, 255, 255, 0.1)",
            selectedTextColor: "ff4081",
            rightIconDesktopFill: "757575"
        },
        menuSubheader: {
            borderColor: "rgba(255, 255, 255, 0.3)",
            textColor: "0097a7"
        },
        overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.54)"
        },
        paper: {
            color: "ffffff"
        },
        radioButton: {
            borderColor: "ffffff",
            checkedColor: "0097a7",
            requiredColor: "00b8d4",
            disabledColor: "rgba(255, 255, 255, 0.3)",
            labelColor: "ffffff",
            labelDisabledColor: "rgba(255, 255, 255, 0.3)"
        }
});

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <App />
    </MuiThemeProvider>
    , document.getElementById('root')
);


registerServiceWorker();
