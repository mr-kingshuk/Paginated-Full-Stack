import React, { useState } from 'react';
import styles from './SearchBox.module.css';

const SearchBox = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');

    const submitHandler = (event) => {
        event.preventDefault();
        const userInfo = {
            name, email, gender
        }
        console.log(userInfo);
        setName('');
        setEmail('');
        setGender('');
    }

    const resetHandler = () => {
        setName('');
        setEmail('');
        setGender('Male');
    }



    return (
        <form
            className={styles.outer}
            onSubmit={submitHandler}
        >
            <div className= {styles.fields}>
                <input
                    type="text"
                    placeholder='Name'
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className = {styles.text_box} />
                <input
                    type="email"
                    placeholder='E-Mail'
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className = {styles.text_box} />
                <select
                    value={gender}
                    onChange={(event) => setGender(event.target.value)}
                    className = {styles.text_box}
                >
                    <option value="">Gender</option>
                    <option value="Male" >Male </option>
                    <option value="Female">Female</option>
                </select>

            </div>
            <div className= {styles.btns}>
                <button 
                    type="submit" 
                    className = {styles.submit_btn} >Submit</button>
                <button 
                    type="reset" 
                    onClick= {resetHandler}
                    className= {styles.reset_btn} >Reset</button>
            </div>
        </form>
    )
};

export default SearchBox;