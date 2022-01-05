import React, {StrictMode} from 'react';
import {BrowserRouter} from "react-router-dom";
import {Provider as StateProvider} from "react-redux";
import Undraw from "react-undraw";
import ErrorBoundary from "../domain/ErrorBoundary/ErrorBoundary";
import store from "../store";
import useMessageListener from "../hooks/useMessageListener";


const withAppPresets = (Component) => () => {
    Undraw.defaultProps.primaryColor = "#0D1D47";
    useMessageListener();

    return (
        <StrictMode>
            <StateProvider store={store}>
                <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
                    <ErrorBoundary>
                        <Component/>
                    </ErrorBoundary>
                </BrowserRouter>
            </StateProvider>
        </StrictMode>
    );
}

export default withAppPresets;
