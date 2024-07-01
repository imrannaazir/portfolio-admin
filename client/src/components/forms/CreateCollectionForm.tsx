/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { useAppDispatch } from "@/redux/hooks";
import { onClose } from "@/redux/features/modal/modalSlice";
import { toast } from "sonner";
import { assignTag } from "@/redux/features/tag/tagSlice";
import { TCreateCollection } from "@/types/rtkQuery.type";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { camelCaseToWords } from "@/lib/utils";
import {
  keyValidationSchema,
  nameValidationSchema,
} from "@/schemas/createCollectionValidation";

type CreateCollectionFormProps = {
  collectionName: string;
  createCollection: TCreateCollection;

  form: any;
};
const CreateCollectionForm: FC<CreateCollectionFormProps> = ({
  collectionName,
  createCollection,
  form,
}) => {
  const dispatch = useAppDispatch();

  const createCollectionValidationSchema = z.object({
    name:
      collectionName === "featureName"
        ? keyValidationSchema
        : nameValidationSchema,
  });

  // form definition
  const createCollectionForm = useForm<
    z.infer<typeof createCollectionValidationSchema>
  >({
    resolver: zodResolver(createCollectionValidationSchema),
    defaultValues: {
      name: "",
    },
  });
  const handleCreateCollection = async (
    data: z.infer<typeof createCollectionValidationSchema>
  ) => {
    const { name } = data;
    try {
      const toastId = toast.loading(`Creating ${collectionName}.`, {
        duration: 2000,
      });
      const response = await createCollection({ name }).unwrap();
      if (response?.data) {
        const tagValue = form.getValues(collectionName);
        const newTagValue = [...tagValue, response?.data?._id];

        // when creating tags
        if (collectionName === "tags") {
          form.setValue(collectionName, newTagValue);
          dispatch(assignTag(response?.data));
        }
        //when creating other data except tag
        else {
          form.setValue(collectionName, response?.data?._id);
        }
        toast.success(`${collectionName} created successfully.`, {
          id: toastId,
        });

        dispatch(onClose());
      }
    } catch (error) {
      toast.error("Something went wrong.", {
        duration: 2000,
      });
    }
  };

  return (
    <div className="">
      <Form {...createCollectionForm}>
        <form
          onSubmit={createCollectionForm.handleSubmit(handleCreateCollection)}
          className="space-y-8"
        >
          <FormField
            control={createCollectionForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">
                  {camelCaseToWords(collectionName)}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={`Enter ${camelCaseToWords(collectionName)}`}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="capitalize">
            Create {camelCaseToWords(collectionName)}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateCollectionForm;
