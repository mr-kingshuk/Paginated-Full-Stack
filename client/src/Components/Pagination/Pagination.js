import React, { useContext } from 'react';
import styles from './Pagination.module.css';

import UserContext from '../../Context/User/UserContext';

const Pagination = (props) => {

    const totalPages = props.total;
    const currentPage = props.current;
    const arr = [];

    const {state, dispatch} = useContext(UserContext);

    const pageHandler = async (pageNum) =>{
        const response = await fetch(`http://localhost:5000/api/users?page=${pageNum}&per_page=5`);
        const json = await response.json();
        dispatch({type: "setUsers", payload: json});
    }

    for(let i =1; i<=totalPages; i++){
        arr.push(<div 
            key={i} 
            className= {i === currentPage ? styles.current : null}
            onClick= {() => pageHandler(i)}>{i}</div>)
    }

    const leftHandler = () => {
        pageHandler(state.metadata.current_page - 1);
    };

    const rightHandler = () => {
        pageHandler(state.metadata.current_page + 1);
    };

    return(
        <div className= {styles.outer}>
            <div 
                className={`${styles.left_arrow} ${state.metadata.current_page > 1 ? null : styles.click_no}`}
                onClick = {state.metadata.current_page > 1 ? leftHandler : null }>Prev</div>
            
            {arr.map((ele) => ele)}
            <div 
                className={`${styles.right_arrow} ${state.metadata.current_page < state.metadata.total_pages ? null :styles.click_no}`}
                onClick={state.metadata.current_page < state.metadata.total_pages ? rightHandler : null}>Next</div>    
        </div>
    );
};

export default Pagination;