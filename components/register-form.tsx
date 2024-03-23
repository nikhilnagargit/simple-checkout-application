"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "./ui/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const registerFormSchema = z.object({
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  password: z.string().max(25).min(10),
});

type RegisterFormValues = z.infer<typeof registerFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<RegisterFormValues> = {};

const RegisterForm = () => {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: RegisterFormValues) {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
    console.log(response);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="xyz@mail.com" {...field} />
              </FormControl>
              <FormDescription>This is your public email.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="strong password"
                  {...field}
                />
              </FormControl>
              <FormDescription>Keep your password safe.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Register</Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
