import React from 'react';
import { inject, observer } from "mobx-react";

import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

import MyAppBar from './MyAppBar';

const theme = createMuiTheme({
    palette: {
        primary: grey,
    },
    MuiToolbar: { // Name of the component ⚛️ / style sheet
        root: { // Name of the rule
          justifyContent: 'space-between', // Some CSS
        },
    },
});

@inject("store")
@observer
class MyApp extends React.Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <MyAppBar />
            </MuiThemeProvider>
        );
    }
}

export default MyApp;