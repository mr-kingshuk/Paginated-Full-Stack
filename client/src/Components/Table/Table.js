import React, { useContext, useEffect, useState} from 'react';
import styles from './Table.module.css';

import UserRow from '../UserRow/UserRow';
import Pagination from '../Pagination/Pagination';
import CreateUser from '../../Pages/CreateUser/CreateUser';

import UserContext from '../../Context/User/UserContext';

const Table = () => {
    const [ modal, setModal ] = useState(false);
    
    const {state, dispatch} = useContext(UserContext);

    useEffect(() => {
        const fetchUserPaginated = async () => {
                const response = await fetch('http://localhost:5000/api/users?page=1&per_page=5');
                const json = await response.json();
                dispatch({type : "setUsers", payload : json});
        };
        fetchUserPaginated();
        // eslint-disable-next-line
    }, []);

    return (
        <div className={styles.outer}>
            <button
                className={styles.add_new_btn}
                onClick={() => setModal(true) }>Add New User</button>

            <table className={styles.table}>
                <thead className={styles.header}>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Created At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                {state.data && state.data.length > 0 ? state.data.map((user) => <UserRow user={user} key={user._id} />) : <td colSpan={5} className={styles.no_users}>No Users Found!!</td>}
            </table>
            <Pagination 
            total={state.metadata.total_pages} 
            current={state.metadata.current_page} />
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