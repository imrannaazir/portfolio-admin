/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
import { Form, FormField, FormItem, FormMessage } from "../../ui/form";
import { Input } from "../../ui/input";
import { UseFormSetValue, useForm } from "react-hook-form";
import { Button } from "../../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "../../ui/loading-button";
import { useCrateVariantMutation } from "@/redux/features/product/productApi";
import { toast } from "sonner";
import { FC } from "react";
import { TProductFormValues } from "@/schemas/product.schema";
import { useAppDispatch } from "@/redux/hooks";
import { onClose } from "@/redux/features/modal/modalSlice";

type TCreateVariant = {
  setValue: UseFormSetValue<TProductFormValues>;
};

const CreateVariant: FC<TCreateVariant> = ({ setValue }) => {
  const dispatch = useAppDispatch();
  const [createVariant, { isLoading }] = useCrateVariantMutation();
  const variantSchema = z.object({
    variant_name: z.string({ required_error: "Variant name is required." }),
  });
  const variantForm = useForm<z.infer<typeof variantSchema>>({
    resolver: zodResolver(variantSchema),
  });
  const handleVariantSubmit = async (values: z.infer<typeof variantSchema>) => {
    const toastId = toast.loading("Crating.", { duration: 2000 });
    try {
      const response = await createVariant(values).unwrap();
      if (response.success) {
        toast.success("created", { id: toastId });
        setValue("variant.variantId", response?.data?._id);
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
    <Form {...variantForm}>
      <form
        className="space-y-4"
        onSubmit={variantForm.handleSubmit(handleVariantSubmit)}
      >
        <FormField
          control={variantForm.control}
          name="variant_name"
          render={({ field }) => (
            <FormItem>
              <Input placeholder="Enter variant name" {...field} />
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

export default CreateVariant;
