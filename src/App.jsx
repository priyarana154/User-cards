import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://randomuser.me/api/?results=30")
      .then((res) => {
        setUsers(res.data.results);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch users");
        setLoading(false);
      });
  }, []);

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  if (error) return <h2 style={{ textAlign: "center" }}>{error}</h2>;

  return (
    <div style={styles.container}>
      {users.map((user, index) => (
        <div key={index} style={styles.card}>
          <img src={user.picture.large} alt="user" style={styles.image} />

          <h3 style={styles.name}>
            {user.name.first} {user.name.last}
          </h3>

          <p style={styles.label}>
            Email: <span style={styles.value}>{user.email}</span>
          </p>

          <p style={styles.label}>
            City: <span style={styles.value}>{user.location.city}</span>
          </p>

          <p style={styles.label}>
            Country: <span style={styles.value}>{user.location.country}</span>
          </p>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "20px",
    padding: "20px",
    background: "#f7f7f7",
    minHeight: "100vh",
  },

  card: {
    background: "#ffffff",
    borderRadius: "14px",
    padding: "18px",
    textAlign: "center",
    boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
    border: "1px solid #eee",
    transition: "0.3s",
  },

  image: {
    borderRadius: "50%",
    width: "85px",
    height: "85px",
    marginBottom: "12px",
    border: "2px solid #FF9A86",
  },

  name: {
    margin: "10px 0",
    color: "#222",
    fontSize: "18px",
  },

  label: {
    margin: "4px 0",
    fontSize: "13px",
    color: "#777",
  },

  value: {
    color: "#FF9A86",
    fontWeight: "800",
  },
};

export default App;
