import { useParams, useNavigate } from "react-router"
import { useState, useEffect } from "react"

function Edit() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const { id } = useParams();

    useEffect(() => {
        getId();
    }, []);

    async function getId() {

        let res = await fetch(url)
        let data = await res.json();
        setName(data.name);
        setEmail(data.email);
        setAge(data.age);
    }
    let url = "http://localhost:3000/users/" + id;
    async function UpdateUsers() {
        let res = await fetch(url, {
            method: "Put",
            body: JSON.stringify({ name, email, age })
        });
        let data = await res.json();
        if (data) {
            alert("Myakuri");
            navigate("/");
        }

    }


    return (
        <>
            <h2>Navigated</h2>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="enter name" />
            <input type="text" value={age} onChange={(e) => setAge(e.target.value)} placeholder="enter Age" />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="enter email" />
            <button onClick={() => UpdateUsers()}>Update User</button>
        </>
    )
}
export default Edit;