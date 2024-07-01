/* eslint-disable @typescript-eslint/no-explicit-any */
import OptionSelector from "@/components/ui/option-selector";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { onOpen } from "@/redux/features/modal/modalSlice";
import { useAppDispatch } from "@/redux/hooks";
import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import AddCategoryPage from "@/pages/AddCategory";

type TSelectCategoriesProps = {
  form: UseFormReturn<any>;
};

const SelectCategories: FC<TSelectCategoriesProps> = ({ form }) => {
  const dispatch = useAppDispatch();
  const { data: categoriesData, isFetching } =
    useGetAllCategoriesQuery(undefined);

  // handle on category add
  const handleOnCategoryAdd = () => {
    dispatch(
      onOpen({
        title: "Create category",
        description:
          "Enter all required information to create new category in your store.",
        children: <AddCategoryPage productForm={form} isInModal={true} />,
        className: "w-full max-w-6xl mx-4",
      })
    );
  };

  //categories
  const categories =
    categoriesData?.data?.map((category) => ({
      label: category.title,
      value: category._id,
    })) || [];

  // handle set categories
  const handleSetCategories = (value: string[] | string) => {
    form.setValue("categories", value as string[]);
  };
  return (
    <OptionSelector
      label="Categories"
      onAdd={handleOnCategoryAdd}
      options={categories}
      setValue={handleSetCategories}
      value={form.watch("categories") || []}
      isDisable={false}
      isLoading={isFetching}
      type="multi"
      width="w-full"
      className="mt-2"
    />
  );
};

export default SelectCategories;
