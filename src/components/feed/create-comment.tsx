"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useOpen } from "@/hooks/use-open";
import { commentSchema, CommentsValues } from "@/lib/helpers/schema";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Comment } from "@/types/dto-out";

interface CreateCommentProps {
  userName: string;
  postId: string;
}

export const CreateComment: FC<CreateCommentProps> = ({ userName, postId }) => {
  const { isOpen, handlerOpen, handleClose } = useOpen();
  const { isLoading, mutateAsync } = useMutation((comment: Comment) => {
    return axios.post("/api/feed/comment", comment);
  });
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentsValues>({ resolver: zodResolver(commentSchema) });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await mutateAsync({ ...data, userName, postId });
      reset();
      handleClose();
      router.refresh();
      toast.success("Success");
    } catch (e) {
      toast.error((e as AxiosError).response?.statusText || "something wrong");
    }
  });

  return (
    <div className="w-full">
      <Accordion expanded={isOpen} onChange={handlerOpen}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Create comment</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form onSubmit={onSubmit}>
            <Stack>
              <TextField
                multiline
                minRows={6}
                {...register("comment")}
                error={!!errors.comment}
                helperText={errors.comment?.message || " "}
              />
              <Button
                disabled={isLoading}
                size="large"
                variant="contained"
                type="submit"
              >
                send
              </Button>
            </Stack>
          </form>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
