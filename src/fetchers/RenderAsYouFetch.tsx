import { Suspense } from "react";
import { Post } from "../types/post";
import { User } from "../types/user";
import wrapPromise from "../utils/wrapPromise";

function fetchProfileData() {
  const fetchUser = fetch("https://jsonplaceholder.typicode.com/users/3").then(
    (userResponse) => userResponse.json()
  );
  const fetchPosts = fetch(
    "https://jsonplaceholder.typicode.com/posts?userId=3"
  ).then((postsResponse) => postsResponse.json());

  return {
    user: wrapPromise<User>(fetchUser),
    posts: wrapPromise<Post[]>(fetchPosts),
  };
}

const resource = fetchProfileData();

export function RenderAsYouFetch() {
  return (
    <Suspense fallback={<p>Loading profile...</p>}>
      <ProfileDetails />
      <Suspense fallback={<p>Loading posts...</p>}>
        <ProfileTimeline />
      </Suspense>
    </Suspense>
  );
}

function ProfileDetails() {
  // Try to read user info, although it might not have loaded yet
  const user = resource.user.read();
  return <p>{user?.name}</p>;
}

function ProfileTimeline() {
  // Try to read posts, although they might not have loaded yet
  const posts = resource.posts.read();
  return (
    <ul style={{ listStyle: "none", fontSize: "14px" }}>
      {posts?.map((post) => (
        <li style={{ marginTop: "2rem", textAlign: "left" }} key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
