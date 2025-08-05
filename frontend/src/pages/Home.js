import React, { useEffect, useState } from "react";

function Home() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");

  const fetchPosts = async () => {
    const res = await fetch("http://localhost:4242/api/posts");
    const data = await res.json();
    setPosts(data);
  };

  const createPost = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:4242/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      });
      if (!res.ok) throw new Error("Failed to post");
      setContent("");
      fetchPosts();
    } catch (err) {
      alert("Post creation failed");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container">
      <h2>Home Feed</h2>
      {localStorage.getItem("token") && (
        <>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
          />
          <button onClick={createPost}>Post</button>
        </>
      )}
      {posts.map((post) => (
        <div
          key={post.id}
          style={{ background: "#fff", padding: "10px", margin: "10px 0" }}
        >
          <p>
            <strong>{post.name}</strong>
          </p>
          <p>{post.content}</p>
          <small>{new Date(post.created_at).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}

export default Home;
