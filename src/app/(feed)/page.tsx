import { getServerSession } from "next-auth";
import { UserAction } from "@/actions/user";
import { PostAction } from "@/actions/post";
import { authOptions } from "@/lib/config/next-auth";
import { CreatePost } from "@/components/feed/create-post";
import { PostCard } from "@/components/feed/post-card";

export const revalidate = 0;

const HomePage = async () => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.email) return null;
  const user = await UserAction.getByEmail(session.user.email);
  if (!user) return null;
  const posts = await PostAction.getAllPosts();

  return (
    <section>
      <h2 className="p-5 text-center">General Feed List</h2>
      {user.role === "author" && <CreatePost userName={user.name} />}
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
};
export default HomePage;
