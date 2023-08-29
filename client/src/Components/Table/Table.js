import React, { useState } from 'react';
import styles from './Table.module.css';

import data from '../../data.json';
import UserRow from '../UserRow/UserRow';
import Pagination from '../Pagination/Pagination';
import CreateUser from '../../Pages/CreateUser/CreateUser';

const Table = () => {
    const users = data;
    const [ modal, setModal ] = useState(false);

    return (
        <div className={styles.outer}>
            <button
                className={styles.add_new_btn}
                onClick={() => {console.log(modal); return setModal(true) }}>Add New User</button>
            <table className={styles.table}>
                <thead className={styles.header}>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                {users.map((user) => <UserRow user={user} key={user.id} />)}
            </table>
            <Pagination total={5} current={2} />
            {
                modal && <CreateUser
                action="Create"
                user={{ name: '', email: '', gender: '' }}
                setModal= {setModal} />
            }     
        </div>
    )
};

export default Table;