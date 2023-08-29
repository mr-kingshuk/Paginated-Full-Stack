import React, { useState } from 'react';
import styles from './UserRow.module.css';

import CreateUser from '../../Pages/CreateUser/CreateUser';

const UserRow = (props) => {
    const [modal, setModal] = useState(false);

    const deleteHandler = () => {

    };

    return (
        <>
            <tbody className={styles.row}>
                <tr>
                    <td className={styles.field}>{props.user.first_name}</td>
                    <td className={styles.field}>{props.user.email}</td>
                    <td className={styles.field}>{props.user.gender}</td>
                    <td className={styles.btns}>
                        <button 
                            className={styles.edit_btn}
                            onClick = {() => setModal(true)}>Edit</button>
                        <button 
                            className={styles.delete_btn}
                            onClick = {deleteHandler}>Delete</button>
                    </td>
                </tr>
            </tbody>
            {
                modal && <CreateUser
                action="Edit"
                user={{ name: props.user.first_name, email: props.user.email, gender: props.user.gender }}
                setModal= {setModal} />
            }  
        </>

    );
};

export default UserRow;