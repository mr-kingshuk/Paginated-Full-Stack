import React, { useState, useContext }  from 'react';
import styles from './SearchBox.module.css';
import UserContext from '../../Context/User/UserContext';

const SearchBox = () =>{
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] =useState('Male');

    //getting the context variable. Now we can use the the sany state or function by using the dot(.) keyword.
    const userContext = useContext(UserContext);

    const submitHandler = (event) => {
        event.preventDefault();

        const user = {name , email, gender };
        console.log(user);
    }

    const resetHandler = () => {
        setName('');
        setEmail('');
        setGender('Male');
        userContext.setUser({...userContext.user, "name": "Shubh" });
    }



    return(
        <form 
            className = {styles.outer}
            onSubmit = {submitHandler}
        >
            <input 
                type="text" 
                placeholder='Name' 
                value = {name} 
                onChange = {(event) => setName(event.target.value)}/>
            <input 
                type="email" 
                placeholder='E-Mail' 
                value = {email} 
                onChange = {(event) => setEmail(event.target.value)} />  
            <select
                value={gender}
                onChange = {(event) => setGender(event.target.value)}
            >
                <option value="Male" >Male </option>
                <option value="Female">Female</option>
            </select>
            <button type="submit">Submit</button>
            <button type="reset" onClick = {resetHandler} >Reset</button>
            <p>
                {userContext.user.name}
            </p>
            <p>
                {userContext.user.age}
            </p> 
        </form>
    )
};

export default SearchBox;