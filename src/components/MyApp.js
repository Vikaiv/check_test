import React from 'react';
import { observer, Provider } from "mobx-react";
import {MobxRouter, startRouter} from 'mobx-router';

// import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';

import RootStore from '../store/rootStore';
import views from "../views/views";
import MyAppBar from './MyAppBar';

const theme = createMuiTheme({
    palette: {
        primary: indigo,
        secondary: {
            main: '#ec407a',
        },
    },
    typography: {
        useNextVariants: true,
        fontSize: 14,
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            '"Helvetica Neue"',
            'Roboto',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(','),
    }
});

@observer
class MyApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            store: new RootStore(),
        };
        startRouter(views, this.state.store);
      }
    render = () => 
        (<Provider store={this.state.store}>
            <MuiThemeProvider theme={theme}>
                <MyAppBar />
                <MobxRouter />
            </MuiThemeProvider>
        </Provider>);
    }

export default MyApp;