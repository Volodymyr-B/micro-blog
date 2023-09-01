import { FC } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Paper,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Post } from "@/types/dto-in";

interface CommentsProps {
  post: Post;
}

export const Comments: FC<CommentsProps> = ({ post }) => {
  return (
    <Accordion disabled={!post.comments.length}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>comments: {post.comments.length}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {post.comments.map((comment) => (
          <Paper key={comment.id} className="bg-gray-200 p-3 mb-4">
            <Typography>Author: {comment.userName}</Typography>
            <Typography>{comment.comment}</Typography>
          </Paper>
        ))}
      </AccordionDetails>
    </Accordion>
  );
};
