import { useState } from "react"
function UserAdd() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    async function setData() {
        let url = "http://localhost:3000/users";
        let res = await fetch(url, {
            method: "Post",
            body: JSON.stringify({ name, email, age })
        })
        let data = await res.json();
        alert(`Added successfully ${data.name} ${data.email} ${data.age}`);
        setName("");
        setEmail("");
        setAge("");

    }


    return (
        <>
            <h2>Add-User</h2>
            <input type="text" onChange={(e) => setName(e.target.value)} required placeholder="Enter name" />
            <input type="text" onChange={(e) => setAge(e.target.value)} required placeholder="Enter age" />
            <input type="text" onChange={(e) => setEmail(e.target.value)} required placeholder="Enter Email" />
            <button onClick={() => setData()}>Add-user</button>
        </>
    )
}
export default UserAdd;