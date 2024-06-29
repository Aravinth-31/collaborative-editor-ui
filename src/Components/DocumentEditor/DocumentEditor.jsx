import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { QuillBinding } from 'y-quill';
import QuillCursors from 'quill-cursors';
import styles from "./DocumentEditor.module.css";
import "./override.css";

import UNDO_ICON from "../../assets/icons/undo.png";
import REDO_ICON from "../../assets/icons/redo.png";
import { getDocumentById, updateDocument } from '../../Utils/api';
import { useNavigate, useParams } from 'react-router-dom';
import { getRandomColor, getUserData } from '../../Utils/functions';
import Header from '../Header/Header';

ReactQuill.Quill.register('modules/cursors', QuillCursors); // Register cursor module

function DocumentEditor() {
    const [username, setUsername] = useState();
    const [color, setColor] = useState(getRandomColor);
    const [doc, setDoc] = useState(null);
    const quillRef = useRef(null);
    const providerRef = useRef(null);
    const yTextRef = useRef(null);
    const awarenessRef = useRef(null);
    const editorRef = useRef(null);

    const { id: documentId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const yDoc = new Y.Doc();
        providerRef.current = new WebsocketProvider('ws://localhost:4000', documentId, yDoc);
        yTextRef.current = yDoc.getText('content');
        awarenessRef.current = providerRef.current.awareness;

        const editor = quillRef.current?.getEditor();
        if (!editor) return;
        editorRef.current = editor

        new QuillBinding(yTextRef.current, editor, awarenessRef.current); // Bind Yjs document to Quill editor

        const cursors = editor?.getModule('cursors'); // Access cursors module
        cursors?.createCursor(username, username, color);

        awarenessRef.current.setLocalStateField('user', { name: username, color });

        // Handle awareness change for cursors
        awarenessRef.current.on('change', () => {
            const states = Array.from(awarenessRef.current.getStates().values());
            states.forEach((state) => {
                if (state.user && state.cursor) {
                    cursors.createCursor(state.user.name, state.user.name, state.user.color);
                    cursors.moveCursor(state.user.name, state.cursor.range);
                }
            });
        });

        // setDoc(yDoc);

        return () => {
            providerRef.current.disconnect();
            // Remove local state to remove cursor
            awarenessRef.current.removeLocalState?.();
            // Remove cursor from Quill editor
            cursors.removeCursor(username);
        };
    }, [username, color]);

    useEffect(() => {
        const userData = getUserData();
        setUsername(userData.username);
    }, []);

    const loadDocumentData = async () => {
        const response = await getDocumentById(documentId);
        if (response.success) {
            setDoc(response.data.document);
            if (!yTextRef.current.toString()) {
                yTextRef.current.insert(0, response.data.document.content);
            }
        }
    }
    useEffect(() => {
        loadDocumentData();
    }, [])

    const handleUndoWithManager = () => {
        editorRef.current.history.undo();
    };

    const handleRedoWithManager = () => {
        editorRef.current.history.redo();
    };

    const saveDocument = async () => {
        const response = await updateDocument(documentId, { content: yTextRef.current.toString() });
        if(response.success){
            navigate("/");
        }
    }

    return (
        <div className={styles.Container}>
            <Header title={"Collaborative Document Editor"} />
            <div className={styles.TitleContainer}>
                <h3>{doc?.title}</h3>
                <div style={{ marginBottom: '10px' }} className={styles.ActionBtnGrp}>
                    <button title='Undo' className={styles.ActionBtn} onClick={handleUndoWithManager}><img src={UNDO_ICON}></img></button>
                    <button title='Redo' className={styles.ActionBtn} onClick={handleRedoWithManager}><img src={REDO_ICON}></img></button>
                </div>
            </div>
            <ReactQuill
                ref={quillRef}
                className='document-editor'
                theme="snow"
                modules={{
                    toolbar: [
                        [{ header: [1, 2, false] }],
                        ['bold', 'italic', 'underline'],
                    ],
                    cursors: true,
                }}
            />
            <button className={styles.SaveBtn} onClick={saveDocument}>Save</button>
        </div>
    );
}

export default DocumentEditor;
