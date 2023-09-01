import React, { useContext, useState } from 'react';
import styles from './UserRow.module.css';
import foramatDistanceToNow from 'date-fns/formatDistanceToNow';

import CreateUser from '../../Pages/CreateUser/CreateUser';
import UserContext from '../../Context/User/UserContext';

const UserRow = (props) => {
    const [modal, setModal] = useState(false);
    const {state, dispatch} = useContext(UserContext);
    const deleteHandler = async () => {
        const response = await fetch(`http://localhost:5000/api/users/${props.user._id}`, { method:  'DELETE' });
        // eslint-disable-next-line
        const json = await response.json();
        let apiURL = null;
        if(state.metadata.current_page === state.metadata.total_pages && state.metadata.items_per_page === 1){
            if(state.metadata.current_page === 1)
                apiURL = `http://localhost:5000/api/users?page=1&per_page=5`;
            else
                apiURL = `http://localhost:5000/api/users?page=${state.metadata.current_page - 1}&per_page=5`;
        }
        else
            apiURL = `http://localhost:5000/api/users?page=${state.metadata.current_page}&per_page=5`
        const res = await fetch(apiURL);
        const js = await res.json();
        dispatch({type : "setUsers", payload : js});
    };

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
                            onClick = {deleteHandler}>Delete</button>
                    </td>
                </tr>
            </tbody>
            {
                modal && <CreateUser
                action="Edit"
                user={props.user}
                setModal= {setModal} />
            }  
        </>

    );
};

export default UserRow;