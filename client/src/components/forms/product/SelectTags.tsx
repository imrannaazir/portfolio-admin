import OptionSelector from "@/components/ui/option-selector";
import { onOpen } from "@/redux/features/modal/modalSlice";
import { useAppDispatch } from "@/redux/hooks";
import { TProductFormValues } from "@/schemas/product.schema";
import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { useGetAllTagQuery } from "@/redux/features/tag/tagApi";
import CreateTag from "./CreateTag";

type TSelectTagsProps = {
  form: UseFormReturn<TProductFormValues>;
};

const SelectTags: FC<TSelectTagsProps> = ({ form }) => {
  const dispatch = useAppDispatch();
  const { data: tagsData, isFetching } = useGetAllTagQuery(undefined);

  // handle on tag add
  const handleOnTagAdd = () => {
    dispatch(
      onOpen({
        title: "Create Tag",
        description:
          "Enter all required information to create new tag in your store.",
        children: (
          <CreateTag
            setValue={form.setValue}
            selectedTags={form.watch("tags") || []}
          />
        ),
        className: "w-full max-w-lg mx-4 overflow-hidden",
      })
    );
  };

  // tags
  const tags =
    tagsData?.data?.map((tag) => ({
      label: tag.name,
      value: tag._id as string,
    })) || [];

  // handle set tags
  const handleSetTags = (value: string[] | string) => {
    form.setValue("tags", value as string[]);
  };
  return (
    <OptionSelector
      label="Tags"
      onAdd={handleOnTagAdd}
      options={tags}
      setValue={handleSetTags}
      value={form.watch("tags") || []}
      isDisable={false}
      isLoading={isFetching}
      type="multi"
      width="w-full"
      className="mt-2"
    />
  );
};

export default SelectTags;
