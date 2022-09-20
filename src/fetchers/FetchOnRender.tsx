import * as React from "react";
import { Post } from "../types/post";
import { User } from "../types/user";

function ProfileTimeline() {
  const [posts, setPosts] = React.useState<Post[] | null>(null);

  React.useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?userId=1")
      .then((response) => response.json())
      .then((posts) => setPosts(posts));
  }, []);

  if (posts === null) {
    return <p style={{ fontSize: "14px", color: "red" }}>Loading posts...</p>;
  }
  return (
    <ul style={{ listStyle: "none", fontSize: "14px" }}>
      {posts.map((post) => (
        <li style={{ marginTop: "2rem", textAlign: "left" }} key={post.id}>
          {post.title}
        </li>
      ))}
    </ul>
  );
}

export function FetchOnRender() {
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then((response) => response.json())
      .then((json) => setUser(json));
  }, []);

  if (user === null) {
    return <p>Loading profile...</p>;
  }
  return (
    <>
      <p>{user.name}</p>
      <ProfileTimeline />
    </>
  );
}
