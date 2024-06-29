import React, { useEffect, useMemo, useState } from 'react';
import styles from "./Home.module.css";
import { useNavigate } from 'react-router-dom';
import { getAllDocuments } from '../../Utils/api';
import { CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import Header from '../Header/Header';
import { getUserData } from '../../Utils/functions';
import AddDocument from '../AddDocument/AddDocument';

export default function Home({ }) {
    const navigate = useNavigate();

    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(false);
    const userData = useMemo(() => getUserData(), []);
    const [open, setOpen] = React.useState(false);

    const loadAllDocuments = async () => {
        setLoading(true)
        const response = await getAllDocuments();
        setLoading(false);
        if (response.success) {
            setDocuments(response.data.documents);
        }
    }
    useEffect(() => {
        loadAllDocuments();
    }, []);

    const handleEdit = (document) => {
        navigate(`/document/${document._id}`);
    }
    return (
        <div className={styles.HomeContainer}>
            <Header title={"Documents"} showAddBtn name={userData.username} />
            <AddDocument open={open} setOpen={setOpen} />
            <div className={`${styles.AddBtnContainer}`}>
                <button className={`primary-btn ${styles.AddBtn}`} onClick={() => setOpen(true)}>+ Add Document</button>
            </div>
            {
                loading ?
                    <div className='spinner'><CircularProgress /></div> :
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Title</TableCell>
                                    <TableCell align="right">Content</TableCell>
                                    <TableCell align="right">Created At</TableCell>
                                    <TableCell align="right">Updated At</TableCell>
                                    <TableCell align="right">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            {
                                documents.length > 0 ?
                                    <TableBody>
                                        {documents.map((row) => (
                                            <TableRow
                                                key={row._id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {row.title}
                                                </TableCell>
                                                <TableCell className={styles.Content} align="right">{row.content || "-"}</TableCell>
                                                <TableCell align="right">{new Date(row.createdAt).toDateString()}</TableCell>
                                                <TableCell align="right">{new Date(row.updatedAt).toDateString()}</TableCell>
                                                <TableCell align="right"><button className={`primary-btn ${styles.EditBtn}`} onClick={() => handleEdit(row)}>Edit</button></TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody> :
                                    <TableBody>
                                        <TableRow>
                                            <TableCell colSpan={5}>
                                                <div className={styles.NoDataContainer}>No Data</div>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                            }


                        </Table>
                    </TableContainer>
            }
        </div>
    )
}
