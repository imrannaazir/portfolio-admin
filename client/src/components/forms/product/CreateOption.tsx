/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
import { Form, FormField, FormItem, FormMessage } from "../../ui/form";
import { Input } from "../../ui/input";
import { UseFormSetValue, useForm } from "react-hook-form";
import { Button } from "../../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "../../ui/loading-button";
import { useCreateOptionMutation } from "@/redux/features/product/productApi";
import { toast } from "sonner";
import { FC } from "react";
import { TProductFormValues } from "@/schemas/product.schema";
import { useAppDispatch } from "@/redux/hooks";
import { onClose } from "@/redux/features/modal/modalSlice";

type TCreateOption = {
  setValue: UseFormSetValue<TProductFormValues>;
  variantId: string;
  selectedOptions: string[];
};

const CreateOption: FC<TCreateOption> = ({
  setValue,
  variantId,
  selectedOptions,
}) => {
  const dispatch = useAppDispatch();
  const [CreateOption, { isLoading }] = useCreateOptionMutation();
  const optionSchema = z.object({
    option_name: z.string({ required_error: "Option name is required." }),
  });
  const optionForm = useForm<z.infer<typeof optionSchema>>({
    resolver: zodResolver(optionSchema),
  });
  const handleOptionSubmit = async (values: z.infer<typeof optionSchema>) => {
    const toastId = toast.loading("Crating.", { duration: 2000 });
    try {
      const response = await CreateOption({ ...values, variantId }).unwrap();
      if (response.success) {
        toast.success("created", { id: toastId });
        setValue("variant.options", [...selectedOptions, response?.data?._id]);
        dispatch(onClose());
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      let errorMessage = error.message || "Failed";
      if (error?.data?.errorSources?.length) {
        errorMessage = error?.data?.errorSources[0]?.message;
      }
      toast.error(errorMessage, { id: toastId });
    }
  };
  return (
    <Form {...optionForm}>
      <form
        className="space-y-4"
        onSubmit={optionForm.handleSubmit(handleOptionSubmit)}
      >
        <FormField
          control={optionForm.control}
          name="option_name"
          render={({ field }) => (
            <FormItem>
              <Input placeholder="Enter option name" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          {isLoading ? (
            <LoadingButton>Creating</LoadingButton>
          ) : (
            <Button>Create</Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default CreateOption;
