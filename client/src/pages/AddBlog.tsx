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

import { toast } from "sonner";
import {} from "@/redux/features/collection/collection.api";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import UploadSingleImage from "@/components/ui/image-upload";
import PageSection from "@/components/ui/page-section";
import TextEditor from "@/components/ui/text-editor";
import { useCreateBlogMutation } from "@/redux/features/blog/blogApi";
import {
  createBlogValidationSchema,
  TBlogFormValues,
} from "@/schemas/blog.schema";

const AddBlogPage = () => {
  const navigate = useNavigate();

  const [createBlog] = useCreateBlogMutation();

  const form = useForm<TBlogFormValues>({
    resolver: zodResolver(createBlogValidationSchema),
  });

  // on submit handler
  const onSubmit = async (data: TBlogFormValues) => {
    const toastId = toast.loading("Creating.", { duration: 2000 });
    try {
      const { description, ...rest } = data;
      const response = await createBlog({
        ...rest,
        content: description,
      }).unwrap();

      if (response.success) {
        toast.success("Created.", { id: toastId });
        form.reset();

        navigate("/blogs/list");
      }
    } catch (error) {
      toast.error("Failed to create.", { id: toastId });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Page title="Create Blog" action={<Action />}>
          {/* form content */}
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
                        <Input placeholder="e.g. What is MongoDB?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => {
                    console.log(field.value);

                    return (
                      <FormItem>
                        <FormLabel>Content</FormLabel>
                        <TextEditor
                          setValue={form.setValue}
                          value={field.value || ""}
                        />
                      </FormItem>
                    );
                  }}
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

export default AddBlogPage;
