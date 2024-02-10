"use client";

import { auth } from "@/auth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { login } from "@/lib/actions";
import { formLoginInput, LoginSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type Props = {};

const Login = (props: Props) => {
  const router = useRouter();

  const form = useForm<formLoginInput>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [loginStatus, setLoginStatus] = useState({
    success: true,
    message: "",
  });

  async function onSubmit(values: formLoginInput) {
    setLoginStatus({ success: true, message: "" });
    const loginStatus = await login(values);
    if (loginStatus.success) {
      router.push("/");
      toast("Login Success", { description: loginStatus.message });
    }

    setLoginStatus(loginStatus);
  }

  return (
    <main className='h-screen flex items-center justify-center flex-col'>
      {!loginStatus.success && (
        <Alert
          variant={"destructive"}
          className='w-96 mb-2'>
          <AlertTitle>Login Failed</AlertTitle>
          <AlertDescription>{loginStatus.message}</AlertDescription>
        </Alert>
      )}

      <Card className='w-96'>
        <CardHeader>
          <CardTitle>LaundryEZ</CardTitle>
          <CardDescription>Login Admin Dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-8'>
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder='Username'
                        disabled={form.formState.isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder='Password'
                        type='password'
                        disabled={form.formState.isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={form.formState.isSubmitting}
                type='submit'>
                {form.formState.isSubmitting ? (
                  <>
                    Login
                    <Loader2 className='ml-2 h-4 w-4 animate-spin' />
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
};

export default Login;
