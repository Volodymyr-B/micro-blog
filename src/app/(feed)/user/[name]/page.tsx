import { getServerSession } from "next-auth";
import { PostAction } from "@/actions/post";
import { UserAction } from "@/actions/user";
import { authOptions } from "@/lib/config/next-auth";
import { AuthorPostCard } from "@/components/feed/author-post-card";

export const revalidate = 0;

interface ParamsProps {
  params: { name: string };
}

const AuthorFeedPage = async ({ params: { name } }: ParamsProps) => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.email) return null;
  const user = await UserAction.getByEmail(session.user.email);
  if (!user) return null;
  const posts = await PostAction.getPostsByName(name);

  return (
    <section>
      <h2 className="p-5 text-center">{posts[0].userName} Feed List</h2>
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <AuthorPostCard
            key={post.id}
            post={post}
            userName={user.name}
            role={user.role}
          />
        ))}
      </div>
    </section>
  );
};
export default AuthorFeedPage;
