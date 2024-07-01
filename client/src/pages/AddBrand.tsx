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

import { createBrandValidationSchema } from "@/schemas/contents.schemas";
import { z } from "zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { UseFormReturn, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateBrandMutation } from "@/redux/features/brand/brandApi";
import UploadSingleImage from "@/components/ui/image-upload";
import PageSection from "@/components/ui/page-section";
import TextEditor from "@/components/ui/text-editor";
import { FC } from "react";
import { TProductFormValues } from "@/schemas/product.schema";
import { useAppDispatch } from "@/redux/hooks";
import { onClose } from "@/redux/features/modal/modalSlice";
type TAddBrandPageProps = {
  isInModal?: boolean;
  productForm?: UseFormReturn<TProductFormValues>;
};
const AddBrandPage: FC<TAddBrandPageProps> = ({ isInModal, productForm }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [createBrand] = useCreateBrandMutation();

  const form = useForm<z.infer<typeof createBrandValidationSchema>>({
    resolver: zodResolver(createBrandValidationSchema),
  });

  // on submit handler
  const onSubmit = async (
    data: z.infer<typeof createBrandValidationSchema>
  ) => {
    const toastId = toast.loading("Creating.", { duration: 2000 });
    try {
      const response = await createBrand(data).unwrap();

      if (response.success) {
        toast.success("Created.", { id: toastId });
        form.reset();
        if (isInModal && productForm) {
          productForm?.setValue("brand", response.data._id);
          dispatch(onClose());
        } else {
          navigate("/contents/brands");
        }
      }
    } catch (error) {
      toast.error("Failed to create.", { id: toastId });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Page title="Create brand" action={<Action />} isInModal={isInModal}>
          {/* form content */}
          <div className="flex my-4 justify-end">
            <Action />
          </div>
          <div className="flex gap-4">
            <div className="w-[66%]">
              <PageSection>
                {/* name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Fresh" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* slogan */}
                <FormField
                  control={form.control}
                  name="slogan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slogan</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Let's make it healthy"
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
              </PageSection>
            </div>
            {/* right side */}
            <div className=" flex-grow  space-y-6">
              <PageSection>
                {/* logo */}
                <FormField
                  control={form.control}
                  name="logo"
                  render={() => (
                    <FormItem>
                      <FormLabel>Logo</FormLabel>
                      <UploadSingleImage
                        fieldValue={""}
                        setValue={form.setValue}
                        className="w-[200px]"
                        fieldName="logo"
                      />
                    </FormItem>
                  )}
                />
              </PageSection>
              <PageSection>
                {/* Cover image*/}
                <FormField
                  control={form.control}
                  name="cover_photo"
                  render={() => (
                    <FormItem>
                      <FormLabel>Cover image</FormLabel>
                      <UploadSingleImage
                        fieldValue={""}
                        setValue={form.setValue}
                        fieldName="cover_image"
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

export default AddBrandPage;
