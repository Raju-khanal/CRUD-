import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const URL = "http://localhost:3000/users";

function UserList() {
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);

            // 1. Load from cache
            const cacheData = localStorage.getItem("users");
            if (cacheData) {
                setUserData(JSON.parse(cacheData));
            }

            // 2. Fetch fresh data
            const res = await fetch(URL);
            if (!res.ok) throw new Error("Failed to fetch users");

            const data = await res.json();

            setUserData(data);

            // 3. Update cache
            localStorage.setItem("users", JSON.stringify(data));

        } catch (error) {
            console.log("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (id) => {
        try {
            const res = await fetch(`${URL}/${id}`, {
                method: "DELETE"
            });

            if (!res.ok) throw new Error("Delete failed");

            // Update UI + cache
            setUserData((prevData) => {
                const updated = prevData.filter((item) => item.id !== id);
                localStorage.setItem("users", JSON.stringify(updated));
                return updated;
            });

        } catch (error) {
            console.log("Error deleting user:", error);
        }
    };

    const editUser = (id) => {
        navigate(`/Edit/${id}`);
    };

    return (
        <>
            <h2>User List</h2>

            {loading ? (
                <p>Loading...</p>
            ) : userData.length === 0 ? (
                <p>No users found</p>
            ) : (
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "20px",
                        padding: "8px",
                    }}
                >
                    {userData.map((item) => (
                        <div
                            key={item.id}
                            style={{
                                width: "200px",
                                height: "120px",
                                border: "2px solid black",
                                padding: "10px",
                            }}
                        >
                            <p><strong>{item.name}</strong></p>
                            <p>Age: {item.age}</p>

                            <button onClick={() => deleteUser(item.id)}>
                                Delete
                            </button>

                            <button onClick={() => editUser(item.id)}>
                                Edit
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

export default UserList;