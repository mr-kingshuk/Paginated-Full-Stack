import UserContext from "./UserContext";
import { useState } from 'react';  

//creating a wrapping component that would wrap all the component in which the state will be used
//along with useState and useContext(if used) will act as an custom hook
const UserState = (props) => {
    const [user, setUser] = useState({"name" : "Kingshuk", "age":10});

    return(
        <UserContext.Provider value = {{user, setUser}}>
            {props.children}
        </UserContext.Provider>  
    )
};

export default UserState;