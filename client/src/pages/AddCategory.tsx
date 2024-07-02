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

import { createCategoryValidationSchema } from "@/schemas/contents.schemas";
import { z } from "zod";
import { toast } from "sonner";
import {} from "@/redux/features/collection/collection.api";
import { useNavigate } from "react-router-dom";
import { UseFormReturn, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateCategoryMutation } from "@/redux/features/category/categoryApi";
import UploadSingleImage from "@/components/ui/image-upload";
import PageSection from "@/components/ui/page-section";
import TextEditor from "@/components/ui/text-editor";
import { TProductFormValues } from "@/schemas/project.schema";
import { FC } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { onClose } from "@/redux/features/modal/modalSlice";
import SelectCategories from "@/components/forms/product/SelectCategories";

type TAddCategoryPageProps = {
  isInModal?: boolean;
  productForm?: UseFormReturn<TProductFormValues>;
};

const AddCategoryPage: FC<TAddCategoryPageProps> = ({
  isInModal,
  productForm,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [createCategory] = useCreateCategoryMutation();

  const form = useForm<z.infer<typeof createCategoryValidationSchema>>({
    resolver: zodResolver(createCategoryValidationSchema),
  });

  // on submit handler
  const onSubmit = async (
    data: z.infer<typeof createCategoryValidationSchema>
  ) => {
    const toastId = toast.loading("Creating.", { duration: 2000 });
    try {
      const response = await createCategory(data).unwrap();

      if (response.success) {
        toast.success("Created.", { id: toastId });
        form.reset();
        if (isInModal && productForm) {
          productForm.setValue("categories", [
            ...(productForm.watch("categories") || []),
            response?.data?._id,
          ]);
          dispatch(onClose());
        } else {
          navigate("/contents/categories");
        }
      }
    } catch (error) {
      toast.error("Failed to create.", { id: toastId });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Page title="Create Category" action={<Action />} isInModal={isInModal}>
          {/* form content */}
          <div className="flex justify-end my-4">
            <Action />
          </div>
          <div className="flex gap-4">
            <div className="w-[66%] ">
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
                          placeholder="e.g. Packaged, Fresh Fruits"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* collection */}
                <SelectCategories form={form} />
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

export default AddCategoryPage;
