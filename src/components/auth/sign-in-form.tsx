"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { signInSchema, SignInValues } from "@/lib/helpers/schema";
import { Button, Stack, TextField } from "@mui/material";

export const SignInForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || `/`;
  const [isLoading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInValues>({ resolver: zodResolver(signInSchema) });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      }).then((res) => {
        if (res?.error) {
          toast.error("Credentials do not match");
        } else {
          router.push(callbackUrl);
        }
      });
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setLoading(false);
    }
  });

  return (
    <div className="w-full">
      <h3 className="text-center mb-7">sign-in</h3>
      <form onSubmit={onSubmit}>
        <Stack spacing={4}>
          <TextField
            type="email"
            label="email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message || " "}
          />
          <TextField
            type="password"
            label="password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message || " "}
          />
          <Button
            disabled={isLoading}
            size="large"
            variant="contained"
            type="submit"
          >
            sign in
          </Button>
        </Stack>
      </form>
    </div>
  );
};
