"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useOpen } from "@/hooks/use-open";
import { postSchema, PostsValues } from "@/lib/helpers/schema";
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
import { Post } from "@/types/dto-out";

interface CreatePostProps {
  userName: string;
}

export const CreatePost: FC<CreatePostProps> = ({ userName }) => {
  const { isOpen, handlerOpen, handleClose } = useOpen();
  const { isLoading, mutateAsync } = useMutation((post: Post) => {
    return axios.post("/api/feed/post", post);
  });
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostsValues>({ resolver: zodResolver(postSchema) });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await mutateAsync({ ...data, userName });
      reset();
      handleClose();
      router.refresh();
      toast.success("Successfully created!");
    } catch (e) {
      toast.error((e as AxiosError).response?.statusText || "something wrong");
    }
  });

  return (
    <div>
      <Accordion expanded={isOpen} onChange={handlerOpen}>
        <AccordionSummary
          className="bg-green-200"
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography>Create post</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form onSubmit={onSubmit}>
            <Stack>
              <TextField
                label="title"
                {...register("title")}
                error={!!errors.title}
                helperText={errors.title?.message || " "}
              />
              <TextField
                multiline
                minRows={6}
                {...register("post")}
                error={!!errors.post}
                helperText={errors.post?.message || " "}
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
