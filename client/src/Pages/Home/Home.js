import React from 'react';

//components
import Header from "../../Components/Header/Header";
import SearchBox from "../../Components/SearchBox/SearchBox";
import Table from "../../Components/Table/Table";

const Home = () => {
    return (
        <div>
            <Header />
            <SearchBox />
            <Table />
        </div>
    );
};

export default Home; 