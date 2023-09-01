import React, {useEffect, useRef, useContext} from 'react';
import styles from './DeleteModal.module.css';

import UserContext from '../../Context/User/UserContext';

const DeleteModal = (props) => {
    const modalRef = useRef();
    const {state, dispatch} = useContext(UserContext);

    useEffect(() => {
        const handler = (event) => {
            if(!modalRef.current.contains(event.target))
                props.setModal(false);
        }; 

        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    });

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
        props.setModal(false);
    };

    return(
        <div className={styles.background}>
            <div className={styles.outer} ref={modalRef}>
                <h2>Delete User</h2>
                <div 
                    className={styles.cross}
                    onClick={() => props.setModal(false)}>X
                </div>
                <div className={styles.para}>
                    Do you really Wish to delete the user "{props.user.name}" with email "{props.user.email}"?
                </div>
                <button onClick={deleteHandler} className={styles.btn}>Delete</button>
            </div>
        </div>
    )
};

export default DeleteModal;