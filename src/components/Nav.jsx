import { Link } from "react-router"
function Nav() {
    return (
        <div>
            <ul style={{ display: "flex", justifyContent: "space-between", width: "300px" }}>
                <li><Link to="/">User-list</Link></li>
                <li><Link to="/add">Add-User</Link></li>
            </ul>

        </div>
    )
}
export default Nav;