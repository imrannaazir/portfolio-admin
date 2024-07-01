/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
import { Form, FormField, FormItem, FormMessage } from "../../ui/form";
import { Input } from "../../ui/input";
import { UseFormSetValue, useForm } from "react-hook-form";
import { Button } from "../../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "../../ui/loading-button";
import { toast } from "sonner";
import { FC } from "react";
import { TProductFormValues } from "@/schemas/product.schema";
import { useAppDispatch } from "@/redux/hooks";
import { onClose } from "@/redux/features/modal/modalSlice";
import { useCreateTagMutation } from "@/redux/features/tag/tagApi";

type TCreateTag = {
  setValue: UseFormSetValue<TProductFormValues>;
  selectedTags: string[];
};

const CreateTag: FC<TCreateTag> = ({ setValue, selectedTags }) => {
  const dispatch = useAppDispatch();
  const [createTag, { isLoading }] = useCreateTagMutation();
  const tagSchema = z.object({
    name: z.string({ required_error: "Tag name is required" }),
  });
  const tagForm = useForm<z.infer<typeof tagSchema>>({
    resolver: zodResolver(tagSchema),
  });

  const handleTagSubmit = async (values: z.infer<typeof tagSchema>) => {
    const toastId = toast.loading("Crating.", { duration: 2000 });
    try {
      const response = await createTag(values).unwrap();
      if (response.success) {
        toast.success("created", { id: toastId });
        setValue("tags", [...selectedTags, response?.data?._id]);
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
    <Form {...tagForm}>
      <form
        className="space-y-4"
        onSubmit={tagForm.handleSubmit(handleTagSubmit)}
      >
        <FormField
          control={tagForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <Input placeholder="Enter tag name" {...field} />
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

export default CreateTag;
