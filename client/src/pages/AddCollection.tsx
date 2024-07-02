import Page from "@/components/layout/Page";
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

import { createCollectionValidationSchema } from "@/schemas/contents.schemas";
import { z } from "zod";
import { toast } from "sonner";
import { useCreateCollectionMutation } from "@/redux/features/collection/collection.api";
import { useNavigate } from "react-router-dom";
import IconPicker from "@/components/contents/IconPicker";
import { zodResolver } from "@hookform/resolvers/zod";
import UploadSingleImage from "@/components/ui/image-upload";
import PageSection from "@/components/ui/page-section";
import TextEditor from "@/components/ui/text-editor";
import { FC } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import { TProductFormValues } from "@/schemas/project.schema";
import { useAppDispatch } from "@/redux/hooks";
import { onClose } from "@/redux/features/modal/modalSlice";
import { cn } from "@/lib/utils";

type AddCollectionPageProps = {
  isInModal?: boolean;
  productForm?: UseFormReturn<TProductFormValues>;
};

const AddCollectionPage: FC<AddCollectionPageProps> = ({
  isInModal = false,
  productForm,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [createCollection] = useCreateCollectionMutation();

  const form = useForm<z.infer<typeof createCollectionValidationSchema>>({
    resolver: zodResolver(createCollectionValidationSchema),
  });

  // on submit handler
  const onSubmit = async (
    data: z.infer<typeof createCollectionValidationSchema>
  ) => {
    const toastId = toast.loading("Creating.", { duration: 2000 });
    try {
      const response = await createCollection(data).unwrap();

      if (response.success) {
        toast.success("Created.", { id: toastId });
        form.reset();
        if (isInModal && productForm) {
          productForm.setValue("collections", [
            ...(productForm?.watch("collections") || []),
            response.data._id,
          ]);
          dispatch(onClose());
        } else {
          navigate("/contents/collections");
        }
      }
    } catch (error) {
      toast.error("Failed to create.", { id: toastId });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Page
          title="Create Collection"
          action={<Action />}
          isInModal={isInModal}
        >
          {/* form content */}
          <div className={cn(isInModal ? "my-4 flex justify-end" : "hidden")}>
            <Action />
          </div>
          <div className="flex gap-4">
            <div className="w-[66%]">
              <PageSection>
                {/* title */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Fruits, Vegetables"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <TextEditor
                        setValue={form.setValue}
                        value={field.value || ""}
                      />
                    </FormItem>
                  )}
                />

                {/* icon */}
                <FormField
                  control={form.control}
                  name="icon"
                  render={() => (
                    <FormItem>
                      <FormLabel>Icon</FormLabel>
                      <IconPicker setValue={form.setValue} />
                    </FormItem>
                  )}
                />
              </PageSection>{" "}
            </div>
            {/* right side */}
            <div className=" flex-grow  ">
              <PageSection>
                <FormField
                  control={form.control}
                  name="image"
                  render={() => (
                    <FormItem className="relative">
                      <FormLabel>Image</FormLabel>
                      <UploadSingleImage
                        fieldValue={""}
                        fieldName="image"
                        setValue={form.setValue}
                      />
                    </FormItem>
                  )}
                />
              </PageSection>
            </div>
          </div>
        </Page>
      </form>
    </Form>
  );
};

const Action = () => {
  return <Button size={"sm"}>Save</Button>;
};

export default AddCollectionPage;
