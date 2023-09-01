import { FC } from "react";
import Link from "next/link";
import { Comments } from "@/components/feed/comments";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import { Post } from "@/types/dto-in";

interface PostCardProps {
  post: Post;
}

export const PostCard: FC<PostCardProps> = ({ post }) => {
  return (
    <div>
      <Card sx={{ width: "100%" }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {post.title}
          </Typography>
          <Typography variant="body2">{post.post}</Typography>
        </CardContent>
        <CardActions>
          <Link href={`/user/${post.userName}`}>
            <Button size="large" variant="contained">
              {post.userName}
            </Button>
          </Link>
        </CardActions>
        <Divider />
        <Comments post={post} />
      </Card>
    </div>
  );
};
