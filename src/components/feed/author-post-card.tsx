import { FC } from "react";
import { CreateComment } from "@/components/feed/create-comment";
import { Comments } from "@/components/feed/comments";
import { Card, CardContent, Divider, Typography } from "@mui/material";
import { Post } from "@/types/dto-in";

interface UserPostCardProps {
  post: Post;
  userName: string;
  role: "author" | "commentator";
}

export const AuthorPostCard: FC<UserPostCardProps> = ({
  post,
  userName,
  role,
}) => {
  return (
    <div>
      <Card sx={{ width: "100%" }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {post.title}
          </Typography>
          <Typography variant="body2">{post.post}</Typography>
        </CardContent>
        <Divider />
        <Comments post={post} />
        <Divider />
        {role === "commentator" && (
          <CreateComment postId={post.id} userName={userName} />
        )}
      </Card>
    </div>
  );
};
