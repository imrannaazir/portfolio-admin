import OptionSelector from "@/components/ui/option-selector";
import AddCollectionPage from "@/pages/AddCollection";
import { useGetAllCollectionsQuery } from "@/redux/features/collection/collection.api";
import { onOpen } from "@/redux/features/modal/modalSlice";
import { useAppDispatch } from "@/redux/hooks";
import { TProductFormValues } from "@/schemas/project.schema";
import { FC } from "react";
import { UseFormReturn } from "react-hook-form";

type TSelectCollectionsProps = {
  form: UseFormReturn<TProductFormValues>;
};

const SelectCollections: FC<TSelectCollectionsProps> = ({ form }) => {
  const dispatch = useAppDispatch();
  const { data: collectionsData, isFetching } =
    useGetAllCollectionsQuery(undefined);

  // handle on collection add
  const handleOnCollectionAdd = () => {
    dispatch(
      onOpen({
        title: "Create collection",
        description:
          "Enter all required information to create new collection in your store.",
        children: <AddCollectionPage productForm={form} isInModal={true} />,
        className: "w-full max-w-6xl mx-4",
      })
    );
  };

  //collections
  const collections =
    collectionsData?.data?.map((collection) => ({
      label: collection.title,
      value: collection._id,
    })) || [];

  // handle set collection
  const handleSetCollections = (value: string[] | string) => {
    form.setValue("collections", value as string[]);
  };
  return (
    <OptionSelector
      label="Collections"
      onAdd={handleOnCollectionAdd}
      options={collections}
      setValue={handleSetCollections}
      value={form.watch("collections") || []}
      isDisable={false}
      isLoading={isFetching}
      type="multi"
      width="w-full"
      className="mt-2"
    />
  );
};

export default SelectCollections;
