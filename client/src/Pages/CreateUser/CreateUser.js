import React, { useContext, useState, useRef, useEffect } from 'react';
import styles from './CreateUser.module.css';

import UserContext from '../../Context/User/UserContext';

const CreateUser = (props) => {
    const [name, setName] = useState(props.user.name);
    const [email, setEmail] = useState(props.user.email);
    const [gender, setGender] = useState(props.user.gender);
    const [error, setError] = useState('');
    const [emptyFields, setEmptyFields] = useState([]);

    const {state, dispatch} = useContext(UserContext);


    const submitHandler = async (e) => {
        e.preventDefault();
        const user = {name, email, gender};;

        if (props.action === "Edit") {    
            const response = await fetch(`http://localhost:5000/api/users/${props.user._id}`, {
                method:  'PATCH',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(user)
            });
            const json = await response.json();
            if (!response.ok) {
                setError(json.error);
                setEmptyFields(json.emptyFields);
            }
            else{
                dispatch({type : "editUser", payload : {user: user, id: json._id}});
                props.setModal(false);
            }
        }
        else if(props.action === "Create"){
            const response = await fetch('http://localhost:5000/api/users', {
                method:  'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(user)
            });
            // eslint-disable-next-line
            const json = await response.json();
            if (!response.ok) {
                setError(json.error);
                setEmptyFields(json.emptyFields);
            }
            else{
                const res = await fetch(`http://localhost:5000/api/users?page=${state.metadata.current_page}&per_page=5`);
                const js = await res.json();
                dispatch({type : "setUsers", payload : js});
                props.setModal(false);
            }

        }
    };

    //click outside the modal to close it functionality
    const modalRef = useRef();
    useEffect(() => {
        let handler = (event) => {
            if(!modalRef.current.contains(event.target)){
                props.setModal(false);
            }
        };

        document.addEventListener("mousedown", handler);

        return () => document.removeEventListener("mousedown", handler);
    })

    //action value can habe 2 values => Create -> to add new user, Edit -> to edit the user
    return (
        <div className={styles.background}>
            <div className={styles.outer} ref={modalRef}>
                <h2>{props.action} User</h2>
                <div 
                    className={styles.cross}
                    onClick={() => props.setModal(false)}>X</div>
                <form
                    className={styles.form}
                    onSubmit={submitHandler}>
                    <div className={styles.fields}>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            placeholder='Name'
                            value={name}
                            id="name"
                            onChange={(event) => setName(event.target.value)}
                            className={`${styles.text_box} ${emptyFields.includes('name') ? styles.error: null}`} />
                    </div>
                    <div className={styles.fields}>
                        <label htmlFor="email">E-Mail</label>
                        <input
                            type="email"
                            placeholder='E-Mail'
                            value={email}
                            id="email"
                            onChange={(event) => setEmail(event.target.value)}
                            className={`${styles.text_box} ${emptyFields.includes('email') ? styles.error: null}`} />
                    </div>
                    <div className={styles.fields}>
                        <select
                            value={gender}
                            id="gender"
                            onChange={(event) => setGender(event.target.value)}
                            className={`${styles.select_box} ${emptyFields.includes('gender') ? styles.error: null}`}
                        >
                            <option value="">Gender</option>
                            <option value="Male" >Male </option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    {error && <div className={styles.error}>{error}</div>}
                    <button
                        type="submit"
                        className={styles.submit_btn} >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateUser; 