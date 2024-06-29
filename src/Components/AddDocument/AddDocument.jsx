import { IconButton, Modal } from '@material-ui/core';
import * as React from 'react';
import Styles from "./AddDocument.module.css";
import CloseIcon from '@material-ui/icons/Close';
import { createDocument } from '../../Utils/api';
import { useNavigate } from 'react-router-dom';

export default function AddDocument({ open, setOpen }) {
    const handleClose = () => setOpen(false);
    const [title, setTitle] = React.useState("");

    const navigate = useNavigate();

    const handleCreate = async () => {
        const response = await createDocument({ title });
        if (response.success) {
            navigate(`/document/${response.data.document._id}`);
        }
    }
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <div className={Styles.AddFormContainer}>
                    <div className={Styles.AddForm}>
                        <IconButton
                            aria-label="close"
                            onClick={handleClose}
                            className={Styles.closeButton}
                        >
                            <CloseIcon />
                        </IconButton>
                        <h2>Add Document</h2>
                        <input placeholder='Enter Title' value={title} onChange={(e) => setTitle(e.target.value)}></input>
                        <button className={`primary-btn ${Styles.CreateBtn}`} onClick={handleCreate}>Create</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}