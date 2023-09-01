import UserContext from "./UserContext";
import { useReducer } from 'react';  

const userReducer = (state, action) => {
    switch(action.type){
        case "setUsers":
            return action.payload;
        case "editUser":   
            const { id, user } = action.payload;
            const userIndex = state.data.findIndex((item) => item._id === id);

            //make a copy of state.data
            const updatedData = [...state.data];
            //update the information of object in the copied array
            updatedData[userIndex] = { ...updatedData[userIndex], ...user };

            //update the state varibale by passing the new value of data
            return {
                ...state,
                data: updatedData,
            };
        default:
            return state;    
    }
};


//creating a wrapping component that would wrap all the component in which the state will be used
//along with useState and useContext(if used) will act as an custom hook
const UserState = (props) => {
    const [state, dispatch] = useReducer(userReducer, {
        data : [],
        metadata : {}
    })

    return(
        <UserContext.Provider value = {{state, dispatch}}>
            {props.children}
        </UserContext.Provider>  
    )
};

export default UserState;