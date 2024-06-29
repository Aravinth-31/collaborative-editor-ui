import React from 'react'
import styles from "./Header.module.css";
import { logOut } from '../../Utils/functions';

export default function Header({ title, showAddBtn, name }) {
    return (
        <div className={styles.Header}>
            <h1>{title}</h1>
            <div className={styles.HeaderBtnGrp}>
                <h2>{name}</h2>
                <button className='btn-secondary' onClick={logOut}>Logout</button>
            </div>
        </div>
    )
}
