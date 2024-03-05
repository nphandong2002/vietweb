import { _userFeeds } from "@/_mock";
import Post from "@/components/post";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trang chủ",
};
function HomePage() {
  return (
    <div>
      {_userFeeds.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

export default HomePage;
