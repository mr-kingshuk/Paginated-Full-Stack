import Header from "./Components/Header/Header";
import SearchBox from "./Components/SearchBox/SearchBox";
import Table from "./Components/Table/Table";

import UserState from "./Context/User/UserState";

function App() {
  return (
    <div>
      <Header />
      <UserState>
        <SearchBox />
        <Table />
      </UserState>
    </div>
  );
}

export default App;