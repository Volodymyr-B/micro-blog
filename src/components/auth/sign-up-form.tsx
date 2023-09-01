"use client";

import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { signUpSchema, SignUpValues } from "@/lib/helpers/schema";
import { Button, MenuItem, Select, Stack, TextField } from "@mui/material";
import { User } from "@/types/dto-out";

export const SignUpForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || `/`;

  const { isLoading, mutateAsync } = useMutation((user: User) => {
    return axios.post("/api/registration", user);
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpValues>({ resolver: zodResolver(signUpSchema) });

  const onSubmit = handleSubmit(async ({ confirmPassword, ...data }) => {
    try {
      await mutateAsync(data);
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl,
      });
    } catch (e) {
      toast.error((e as AxiosError).response?.statusText || "something wrong");
    }
  });

  return (
    <div className="w-full">
      <h3 className="text-center mb-7">sign-up</h3>
      <form onSubmit={onSubmit}>
        <Stack spacing={4}>
          <TextField
            label="name"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message || " "}
          />
          <TextField
            type="email"
            label="email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message || " "}
          />
          <Select defaultValue="author" {...register("role")}>
            <MenuItem value="author">author</MenuItem>
            <MenuItem value="commentator">commentator</MenuItem>
          </Select>
          <TextField
            type="password"
            label="password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message || " "}
          />
          <TextField
            type="password"
            label="confirm password"
            {...register("confirmPassword")}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message || " "}
          />
          <Button
            disabled={isLoading}
            size="large"
            variant="contained"
            type="submit"
          >
            sign up
          </Button>
        </Stack>
      </form>
    </div>
  );
};
