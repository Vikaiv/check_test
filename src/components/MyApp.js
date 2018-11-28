import React from 'react';
import { observer, Provider } from "mobx-react";
import {MobxRouter, startRouter} from 'mobx-router';
import styled from "styled-components";

// import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';

import RootStore from '../store/rootStore';
import views from "../views/views";
import MyAppBar from './MyAppBar';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1440px;
  margin: 0 auto;
`;

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
                <Container>
                    <MobxRouter />
                </Container>
            </MuiThemeProvider>
        </Provider>);
    }

export default MyApp;