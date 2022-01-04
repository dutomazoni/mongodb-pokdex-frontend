import React from 'react';
import {BrowserRouter} from "react-router-dom";
import {Content} from "./common/components";
import {Header} from "./common/components";
import {Footer} from "./common/components";

function App() {
    return (
        <div>
            <Header/>
            <BrowserRouter>
                <Content/>
            </BrowserRouter>
            <Footer/>
        </div>
    );
}

export default App;
