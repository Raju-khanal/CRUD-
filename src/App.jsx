import UserList from "./components/UserList"
import UserAdd from "./components/UserAdd"
import { Routes, Route } from "react-router"
import Nav from "./components/Nav"
import Edit from "./components/Edit"
function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/add" element={<UserAdd />} />
        <Route path="/Edit/:id" element={<Edit />} />
        <Route path="/*" element="myakuri j paye tei url hanxas" />
      </Routes>
    </>
  )
}
export default App;