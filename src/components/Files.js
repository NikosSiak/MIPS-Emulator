import React, { useContext, useState } from "react";

import styled from "styled-components";
import { Context } from "../context/Context";
import * as actions from "../context/actionTypes";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import { IconButton } from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import CloseIcon from "@material-ui/icons/Close";

const Files = () => {
    const [state, dispatch] = useContext(Context);

    const { currentFile, files } = state.editor;

    const handleNewFile = () => {
        dispatch({ type: actions.NEW_FILE });
    };

    const handleCloseFile = (index) => {
        dispatch({ type: actions.CLOSE_FILE, payload: index });
    };

    return (
        <StyledFiles>
            <Tabs value={currentFile} aria-label="file tabs" textColor="secondary">
                {files.map((file, index) => (
                    <Tab
                        key={index}
                        component="div"
                        label={
                            <div style={{ display: "flex" }}>
                                {file.fileName}
                                {files.length !== 1 ? 
                                    <CloseIcon
                                        fontSize="small"
                                        // style={{ paddingBottom: 5 }}
                                        onClick={() => handleCloseFile(index)}
                                    />
                                : null}
                            </div>
                        }
                        onClick={(e) => dispatch({ type: actions.CHANGE_FILE, payload: { index, target: e.target }})}
                        style={{ textTransform: "none" }}
                    />
                ))}
            </Tabs>

            <IconButton color="primary" onClick={handleNewFile}>
                <AddCircleOutlineOutlinedIcon />
            </IconButton>
        </StyledFiles>
    );
};

const StyledFiles = styled.div`
    display: flex;
    align-items: center;
    height: 35px;
    background: #1a1a1a;
    padding-left: 10px;
    color: white;

    button {
        margin: 0 5px;
    }
`;

export default Files;
