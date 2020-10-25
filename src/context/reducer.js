import * as actions from "./actionTypes";
import { calculateFileName } from "../utils/functions";

export const reducer = (state, { type, payload }) => {
    switch (type) {
        // handle editor
        case actions.SET_EDITOR:
            state.editor.files[state.editor.currentFile].content = payload.content;
            return {
                ...state,
            };
        // handle files
        case actions.OPEN_FILE:
            return {
                ...state,
                editor: {
                    ...state.editor,
                    currentFile: state.editor.files.length - 1,
                    files: [
                        ...state.editor.files,
                        {
                            content: payload.content,
                            fileName: payload.fileName,
                        },
                    ],
                },
            };
        case actions.CLOSE_FILE:
            state.editor.files.splice(payload, 1);
            return {
                ...state,
                editor: {
                    currentFile: payload <= state.editor.currentFile && state.editor.currentFile !== 0 
                        ? state.editor.currentFile - 1
                        : state.editor.currentFile,
                    files: state.editor.files,
                },
            };;
        case actions.NEW_FILE:
            const { files } = state.editor;

            return {
                ...state,
                editor: {
                    currentFile: state.editor.files.length,
                    files: [
                        ...state.editor.files,
                        {
                            content: "",
                            fileName: calculateFileName(files, "Untitled.asm"),
                        },
                    ],
                },
            };;
        case actions.CHANGE_FILE:
            if (payload.target.tagName === "DIV") {
                return {
                    ...state,
                    editor: { ...state.editor, currentFile: payload.index },
                };
            }
            return { ...state };
        // handle editor settings
        case actions.CHANGE_THEME:
            return { ...state, editorSettings: { ...state.editorSettings, theme: payload } };
        case actions.CHANGE_FONT_SIZE:
            return {
                ...state,
                editorSettings: {
                    ...state.editorSettings,
                    fontSize: payload,
                },
            };
        // handle sidebar
        case actions.CHANGE_NUMERAL_SYSTEM:
            return {
                ...state,
                sidebar: {
                    ...state.sidebar,
                    numeralSystem: payload,
                },
            };
        case actions.TOGGLE_SIDE_BAR:
            return {
                ...state,
                sidebar: {
                    ...state.sidebar,
                    visible: !state.sidebar.visible,
                },
            };
        default:
            return state;
    }
};
