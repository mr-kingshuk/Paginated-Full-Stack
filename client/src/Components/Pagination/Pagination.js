import React from 'react';
import styles from './Pagination.module.css';

const Pagination = (props) => {
    const totalPages = props.total;
    const currentPage = props.current;
    const arr = []

    for(let i =1; i<=totalPages; i++){
        arr.push(<div key={i} className= {i === currentPage ? styles.current : null}>{i}</div>)
    }

    return(
        <div className= {styles.outer}>
            <div className={styles.left_arrow}>^</div>
            {arr.map((ele) => ele)}
            <div className={styles.right_arrow}>^</div>
        </div>
    );
};

export default Pagination;