import React from 'react';
import {BrowserRouter} from "react-router-dom";
import {Content} from "./common";
import {Header} from "./common";
import './scss/App.scss'

function App() {
    return (
        <div>
            <Header/>
            <BrowserRouter>
                <Content/>
            </BrowserRouter>
        </div>
    );
}

export default App;
