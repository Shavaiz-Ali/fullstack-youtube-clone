/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, registerSchema } from "@/schemas";
import { z } from "zod";
import { useAuthContext } from "@/context/authContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import FormResMessage from "./form-message";
import FormFooter from "./form-footer";
const SignInForm = () => {
  const router = useRouter();
  const { loginUser, loader, alert } = useAuthContext();  
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    const res = await loginUser(data);
    // console.log(res);
    if (res?.status === 200) {
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-3">
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
        {alert.message && alert.visible && (
          <FormResMessage message={alert.message} messageType={alert.type} />
        )}
        <Button className="w-[300px] bg-main text-[#000000] text-md font-medium mt-3 rounded-none hover:bg-main/90">
          {loader ? "Loading..." : " Sign In"}
        </Button>
        <FormFooter
          description="Don't have an account? "
          link="Sign Up"
          path="/auth/register"
        />
      </form>
    </Form>
  );
};

export default SignInForm;
