import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hooks";
import { logIn } from "@/redux/features/auth/authSlice";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { loginFormSchema } from "@/schemas/auth.schema";
import { TResponse } from "@/types/global.types";

const LoginForm = () => {
  const [login] = useLoginMutation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // 1. Define your form.
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "admin.portfolio@gmai.com",
      password: "password123",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    const toastId = toast.loading("Logging in.", {
      duration: 2000,
    });

    try {
      const response = (await login(values)) as TResponse<{
        data: { accessToken: string };
      }>;

      if (response?.error) {
        toast.error(response.error.data.errorSources[0].message, {
          id: toastId,
        });
      }

      if (response.data) {
        toast.success("Logged in.", {
          id: toastId,
        });

        navigate("/", { replace: true });
        dispatch(
          logIn({
            accessToken: response?.data?.data?.accessToken,
            user: jwtDecode(response?.data?.data?.accessToken),
          })
        );
      }
    } catch (error) {
      toast.error("Something went wrong.", {
        id: toastId,
      });
    }
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
                <Input placeholder="Enter email address." {...field} />
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter password."
                  type="password"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit"> Login </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
