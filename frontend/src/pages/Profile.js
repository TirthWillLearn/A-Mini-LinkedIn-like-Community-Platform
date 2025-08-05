import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = id === "me" ? await getMyId() : id;
        const res = await fetch(`http://localhost:4242/api/users/${userId}`);
        const data = await res.json();
        setUser(data.user);
        setPosts(data.posts);
      } catch (err) {
        console.error("Failed to load profile:", err);
      }
    };

    fetchData();
  }, [id]);

  const getMyId = async () => {
    const res = await fetch("http://localhost:4242/api/auth/me", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const data = await res.json();
    return data.id;
  };

  if (!user) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <h2>{user.name}'s Profile</h2>
      <p>{user.email}</p>
      <p>{user.bio}</p>
      <h3>Posts</h3>
      {posts.map((post) => (
        <div
          key={post.id}
          style={{ background: "#fff", padding: "10px", margin: "10px 0" }}
        >
          <p>{post.content}</p>
          <small>{new Date(post.created_at).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}

export default Profile;
