import React, { useContext, useState } from "react";

import styled from "styled-components";

import { Context } from "../context/Context";
import * as actions from "../context/actionTypes";

import { themes, fontSizes } from "../utils/editorSettings";

import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import CloseIcon from "@material-ui/icons/Close";
import SkipNextTwoToneIcon from "@material-ui/icons/SkipNextTwoTone";
import FolderOpenTwoToneIcon from "@material-ui/icons/FolderOpenTwoTone";

const Navigation = ({wasm}) => {
    const [state, dispatch] = useContext(Context);
    const [anchorElMenu, setAnchorElMenu] = useState(null);
    const [anchorElFontSize, setAnchorElFontSize] = useState(null);
    const [anchorElTheme, setAnchorElTheme] = useState(null);

    const handleThemeChange = (theme) => {
        dispatch({ type: actions.CHANGE_THEME, payload: theme });
    };

    const handleFontSizeChange = (fontSize) => {
        dispatch({ type: actions.CHANGE_FONT_SIZE, payload: fontSize });
    };

    const handleClick = (event) => {
        setAnchorElMenu(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorElMenu(null);
    };

    const newFile = () => {
        dispatch({ type: actions.NEW_FILE });
    };

    const openFile = async (e) => {
        e.preventDefault();
        const reader = new FileReader();
        reader.fileName = e.target.files[0].name;
        reader.onload = async (e) => {
            const text = e.target.result;
            dispatch({
                type: actions.OPEN_FILE,
                payload: { content: text, fileName: e.target.fileName },
            });
            console.log(e.target.fileName);
        };
        reader.readAsText(e.target.files[0]);
    };

    const downloadFile = () => {
        let file = new Blob([state.editor.files[state.editor.currentFile].content], {
            type: "text/plain;charset=utf-8",
        });
        let atag = document.createElement("a");
        atag.href = URL.createObjectURL(file);
        atag.download = state.editor.files[state.editor.currentFile].fileName;
        atag.click();
    };

    const closeFile = () => {
        dispatch({ type: actions.CLOSE_FILE, payload: state.editor.currentFile });
    };

    const toggleSidebar = () => {
        dispatch({ type: actions.TOGGLE_SIDE_BAR });
    };

    return (
        <StyledNavigation>
            <Button
                aria-controls="menu-files"
                variant="outlined"
                aria-haspopup="true"
                onClick={handleClick}
                endIcon={<FolderOpenTwoToneIcon />}
            >
                Files
            </Button>

            <Menu
                id="menu-files"
                anchorEl={anchorElMenu}
                keepMounted
                open={Boolean(anchorElMenu)}
                onClose={handleClose}
            >
                <MenuItem
                    onClick={() => {
                        handleClose();
                        newFile();
                    }}
                >
                    New
                </MenuItem>
                <MenuItem
                    onClick={(e) => {
                        handleClose();
                    }}
                >
                    <input
                        style={{ display: "none" }}
                        id="upload-file"
                        type="file"
                        onChange={(e) => {
                            openFile(e);
                        }}
                        accept="text/plain"
                    />
                    <label htmlFor="upload-file">Open</label>
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        handleClose();
                        downloadFile();
                    }}
                >
                    Download
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        handleClose();
                        closeFile();
                    }}
                >
                    Close
                </MenuItem>
            </Menu>

            <Button
                aria-controls="menu-run"
                variant="outlined"
                aria-haspopup="true"
                endIcon={<PlayArrowIcon />}
                onClick={() => { wasm.test(() => { console.log("test") }) }}
            >
                Run
            </Button>
            <Button
                aria-controls="menu-step"
                variant="outlined"
                aria-haspopup="true"
                endIcon={<SkipNextTwoToneIcon />}
            >
                Step
            </Button>

            <Button
                aria-controls="menu-font"
                variant="outlined"
                aria-haspopup="true"
                onClick={(e) => setAnchorElFontSize(e.currentTarget)}
            >
                Font Size:{state.editorSettings.fontSize}
            </Button>
            <Menu
                id="menu-font"
                anchorEl={anchorElFontSize}
                keepMounted
                open={Boolean(anchorElFontSize)}
                onClose={() => setAnchorElFontSize(null)}
            >
                {fontSizes.map((fontSize) => (
                    <MenuItem
                        key={fontSize}
                        onClick={() => {
                            setAnchorElFontSize(null);
                            handleFontSizeChange(fontSize);
                        }}
                    >
                        {fontSize}
                    </MenuItem>
                ))}
            </Menu>

            <Button
                aria-controls="menu-theme"
                variant="outlined"
                aria-haspopup="true"
                onClick={(e) => setAnchorElTheme(e.currentTarget)}
            >
                Theme: {state.editorSettings.theme}
            </Button>

            <Menu
                id="menu-theme"
                anchorEl={anchorElTheme}
                keepMounted
                open={Boolean(anchorElTheme)}
                onClose={() => setAnchorElTheme(null)}
            >
                {themes.map((theme) => (
                    <MenuItem
                        key={theme}
                        onClick={() => {
                            setAnchorElTheme(null);
                            handleThemeChange(theme);
                        }}
                    >
                        {theme}
                    </MenuItem>
                ))}
            </Menu>

            <IconButton aria-label="toggle" style={{ marginLeft: "auto" }} onClick={toggleSidebar}>
                {state.sidebar.visible ? <CloseIcon /> : <OpenInNewIcon />}
            </IconButton>
        </StyledNavigation>
    );
};

const StyledNavigation = styled.div`
    width: 100%;
    background: black;
    height: 50px;
    display: flex;
    align-items: center;
    padding: 1rem;
    z-index: 10;

    button {
        margin: 0 5px;
    }
`;

export default Navigation;
