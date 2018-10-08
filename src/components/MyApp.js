import React from 'react';
import { inject, observer, Provider } from "mobx-react";

// import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

import RootStore from '../store/rootStore';
import MyAppBar from './MyAppBar';
import DisciplineList from './DisciplineList';

const theme = createMuiTheme({
    palette: {
        primary: grey,
    },
});

@observer
class MyApp extends React.Component {
    state = {
        store: new RootStore()
    }
    render = () => 
        (<Provider store={this.state.store}>
            <MuiThemeProvider theme={theme}>
                <MyAppBar />
                <DisciplineList />
            </MuiThemeProvider>
        </Provider>);
    }

export default MyApp;