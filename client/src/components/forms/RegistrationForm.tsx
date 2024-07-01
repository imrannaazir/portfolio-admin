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
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hooks";
import { logIn } from "@/redux/features/auth/authSlice";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { registrationValidationSchema } from "@/schemas/auth.schema";
import { TResponse } from "@/types/global.types";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Role } from "@/constant/constant";

const RegistrationForm = () => {
  const [register] = useRegisterMutation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // 1. Define your form.
  const form = useForm<z.infer<typeof registrationValidationSchema>>({
    resolver: zodResolver(registrationValidationSchema),
  });

  // 2. Define a submit handler.
  async function onSubmit(
    values: z.infer<typeof registrationValidationSchema>
  ) {
    const toastId = toast.loading("Account Creating.", {
      duration: 2000,
    });

    try {
      const response = (await register(values)) as TResponse<{
        data: { accessToken: string };
      }>;
      if (response?.error) {
        toast.error(response.error?.data?.errorSources?.[0]?.message, {
          id: toastId,
        });
      }

      if (response?.data?.data?.accessToken) {
        toast.success("Registered.", {
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
          name="name.firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter first name." {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name.middleName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Middle Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter middle name." {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name.lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter last name." {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Role</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={Role[0]}
                  className="flex flex-col space-y-1"
                >
                  {Role.map((item) => (
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={item} />
                      </FormControl>
                      <FormLabel className="font-normal">{item}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
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
        <Button type="submit"> Register </Button>
      </form>
    </Form>
  );
};

export default RegistrationForm;
