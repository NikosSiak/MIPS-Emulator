import React, { useEffect, useState } from "react";

import styled from "styled-components";

import Navigation from "./components/Navigation";
import Terminal from "./components/Terminal";
import Editor from "./components/Editor";
import Sidebar from "./components/Sidebar";

async function loadWasm() {
    try {
        return import("emulator-wasm");
    }
    catch (err) {
        console.error(`Unexpected error in loadWasm. [Message: ${err.message}]`);
    }
}

function App() {
    const [wasm, setWasm] = useState(null);

    useEffect(() => {
        loadWasm().then(setWasm);
    }, [])

    return (
        <StyledApp>
            <Navigation />
            <Column>
                <Row>
                    <Editor />
                    <Terminal />
                </Row>
                <Sidebar />
            </Column>
        </StyledApp>
    );
}

const StyledApp = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
`;

const Column = styled.div`
    display: flex;
    height: 100%;
`;

const Row = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    flex: 6;
`;

export default App;
