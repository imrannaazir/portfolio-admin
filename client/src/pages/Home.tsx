import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import TextEditor from "@/components/ui/text-editor";

const HomePage = () => {
  const schema = z.object({
    description: z.string(),
  });
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (values: z.infer<typeof schema>) => {
    console.log(values);
  };

  console.log(form.watch("description"));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <TextEditor setValue={form.setValue} value={field.value} />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default HomePage;
