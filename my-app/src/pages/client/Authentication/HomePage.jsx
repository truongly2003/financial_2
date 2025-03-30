import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/loginPage");
    }
  }, [navigate]);

  if (!user) return <div>Loading...</div>;

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome, {user.name}</h1>
      <img src={user.picture} alt="Profile" style={{ borderRadius: "50%" }} />
      <p>Email: {user.email}</p>
      <button onClick={() => {
        localStorage.removeItem("user");
        navigate("/loginPage");
      }}>
        Logout
      </button>
    </div>
  );
}

export default HomePage;