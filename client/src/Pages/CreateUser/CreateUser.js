import React, { useState } from 'react';
import styles from './CreateUser.module.css';

const CreateUser = (props) => {

    const [name, setName] = useState(props.user.name);
    const [email, setEmail] = useState(props.user.email);
    const [gender, setGender] = useState(props.user.gender);

    const submitHandler = (e) => {
        e.preventDefault();
        const user = { name, email, gender };
        console.log(user);
        console.log("form submitted");
        props.setModal(false);
    };

    //action value can habe 2 values => Create -> to add new user, Edit -> to edit the user
    return (
        <div className={styles.outer}>
            <h2>{props.action} User</h2>
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
                        className={styles.text_box} />
                </div>
                <div className={styles.fields}>
                    <label htmlFor="email">E-Mail</label>
                    <input
                        type="email"
                        placeholder='E-Mail'
                        value={email}
                        id="email"
                        onChange={(event) => setEmail(event.target.value)}
                        className={styles.text_box} />
                </div>
                <div className={styles.fields}>
                    <select
                        value={gender}
                        id= "gender"
                        onChange={(event) => setGender(event.target.value)}
                        className={styles.select_box}
                    >
                        <option value="">Gender</option>
                        <option value="Male" >Male </option>
                        <option value="Female">Female</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className={styles.submit_btn} >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default CreateUser; 