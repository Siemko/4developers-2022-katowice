import * as React from "react";
import { Post } from "../types/post";
import { User } from "../types/user";

async function fetchUserProfile() {
  const [user, posts] = await Promise.all([
    fetch("https://jsonplaceholder.typicode.com/us").then((userResponse) =>
      userResponse.json()
    ),
    fetch("https://jsonplaceholder.typicode.com/posts?userId=2").then(
      (postsResponse) => postsResponse.json()
    ),
  ]);
  return { user, posts };
}

function ProfileTimeline({ posts }: { posts: Post[] | null }) {
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

const promise = fetchUserProfile();

export function FetchThenRender() {
  const [user, setUser] = React.useState<User | null>(null);
  const [posts, setPosts] = React.useState<Post[] | null>(null);

  React.useEffect(() => {
    promise.then(({ user, posts }) => {
      setUser(user);
      setPosts(posts);
    });
  }, []);

  if (user === null) {
    return <p>Loading profile...</p>;
  }
  return (
    <>
      <p>{user.name}</p>
      <ProfileTimeline posts={posts} />
    </>
  );
}
