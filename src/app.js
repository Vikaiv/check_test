import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import store from "./store/rootStore";

import MyApp from './components/MyApp';

const jsx = (
    <Provider store={store}>
        <MyApp />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));