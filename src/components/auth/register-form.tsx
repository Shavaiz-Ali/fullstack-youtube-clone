/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/schemas";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useAuthContext } from "@/context/authContext";
import FormResMessage from "./form-message";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import FormFooter from "./form-footer";
const SignUpForm = () => {
  const { registerUser, loader, alert, messageType, showMesage } =
    useAuthContext();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      fullName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    const res = await registerUser(data);
    if (res?.status === 201) {
      form.reset();
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-3">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Username*</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    disabled={loader}
                    placeholder="username"
                    className="w-[300px] text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Full Name*</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    disabled={loader}
                    placeholder="full name"
                    className="w-[300px] text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Email*</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    disabled={loader}
                    placeholder="email"
                    className="w-[300px] text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Password*</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    disabled={loader}
                    placeholder="password"
                    className="w-[300px] text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {alert?.message && alert.visible && (
          <FormResMessage message={alert?.message} messageType={alert.type} />
        )}
        <Button className="w-[300px] bg-main text-[#000000] text-md font-medium mt-3 rounded-none hover:bg-main/90">
          {loader ? "loading..." : "Sign Up"}
        </Button>
        <FormFooter
          description="Already have an account? "
          link="Sign In"
          path="/auth/login"
        />
      </form>
    </Form>
  );
};

export default SignUpForm;
