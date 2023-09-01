import React, { useState } from 'react';
import styles from './UserRow.module.css';
import foramatDistanceToNow from 'date-fns/formatDistanceToNow';

import CreateUser from '../../Pages/CreateUser/CreateUser';
import DeleteModal from '../DeleteModal/DeleteModal';

const UserRow = (props) => {
    const [modal, setModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    
    return (
        <>
            <tbody className={styles.row}>
                <tr>
                    <td className={styles.field}>{props.user.name}</td>
                    <td className={styles.field}>{props.user.email}</td>
                    <td className={styles.field}>{props.user.gender}</td>
                    <td className={styles.field}>{foramatDistanceToNow(new Date(props.user.createdAt), { addSuffix: true})}</td>
                    <td className={styles.btns}>
                        <button 
                            className={styles.edit_btn}
                            onClick = {() => setModal(true)}>Edit</button>
                        <button 
                            className={styles.delete_btn}
                            onClick = {() => setDeleteModal(true)}>Delete</button>
                    </td>
                </tr>
            </tbody>
            {
                modal && <CreateUser
                action="Edit"
                user={props.user}
                setModal= {setModal} />
            }  
            {
                deleteModal && <DeleteModal
                user={props.user}
                setModal= {setDeleteModal} />
            }  
        </>

    );
};

export default UserRow;