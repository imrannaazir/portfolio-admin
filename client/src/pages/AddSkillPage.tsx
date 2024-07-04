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
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import UploadSingleImage from "@/components/ui/image-upload";
import PageSection from "@/components/ui/page-section";
import { useCreateSkillMutation } from "@/redux/features/skill/skillApi";
import {
  createSkillValidationSchema,
  TSkillFormValues,
} from "@/schemas/skill.schema";

const AddSkillPage = () => {
  const navigate = useNavigate();

  const [createSkill] = useCreateSkillMutation();

  const form = useForm<TSkillFormValues>({
    resolver: zodResolver(createSkillValidationSchema),
  });

  // on submit handler
  const onSubmit = async (data: TSkillFormValues) => {
    const toastId = toast.loading("Creating.", { duration: 2000 });
    try {
      const response = await createSkill(data).unwrap();

      if (response.success) {
        toast.success("Created.", { id: toastId });
        form.reset();

        navigate("/skills/list");
      }
    } catch (error) {
      toast.error("Failed to create.", { id: toastId });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Page title="Create Skill" action={<Action />}>
          {/* form content */}
          <div className="flex gap-4">
            <div className="w-[66%] ">
              <PageSection>
                {/* title */}
                <FormField
                  control={form.control}
                  name="label"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Label</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. MongoDB" {...field} />
                      </FormControl>
                      <FormMessage />
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

export default AddSkillPage;
