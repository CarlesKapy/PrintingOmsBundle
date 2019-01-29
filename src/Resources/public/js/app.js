import React from 'react';
import ReactDOM from 'react-dom';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import omsAppReducers from './reducers'

import OmsBoard from './components/oms-board';

const theme = createMuiTheme({
    typography: {
        fontFamily: ['"Helvetica Neue LT Std Bold Condensed"'],
    }
});

class App extends React.Component {

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <OmsBoard />
            </MuiThemeProvider>
        )
    }
}

const store = createStore(omsAppReducers);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);