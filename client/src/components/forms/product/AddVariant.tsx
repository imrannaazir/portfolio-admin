import {
  useGetAllOptionsQuery,
  useGetAllVariantsQuery,
} from "@/redux/features/project/projectApi";
import { FC, useEffect, useState } from "react";

import { UseFormReturn } from "react-hook-form";
import { TProductFormValues } from "@/schemas/project.schema";
import { useAppDispatch } from "@/redux/hooks";
import { onOpen } from "@/redux/features/modal/modalSlice";
import CreateVariant from "./CreateVariant";
import CreateOption from "./CreateOption";
import { Button } from "@/components/ui/button";
import ProductVariantPreview from "./ProductVariantPreview";
import { cn } from "@/lib/utils";
import OptionSelector from "@/components/ui/option-selector";

type TAddVariantProps = {
  form: UseFormReturn<TProductFormValues>;
};

const AddVariant: FC<TAddVariantProps> = ({ form }) => {
  //  hook
  const dispatch = useAppDispatch();
  const [skip, setSkip] = useState(true);

  // watch form value
  const variantId = form.watch("variant.variantId");
  const optionsValue = form.watch("variant.options");
  const productVariants = form.watch("variants") || [];

  // query hook
  const { data: variantsData, isFetching: isVariantFetching } =
    useGetAllVariantsQuery(undefined);
  const { data: optionsData, isFetching: isOptionFetching } =
    useGetAllOptionsQuery(`variantId=${variantId}`, { skip });

  /* 
* filter variants : if already crated a variant with the variant name filter out that variant
 1. by some method checked is any entry in the selected product variant that variantId matches with the variant filter out that variant. 

*/
  const filteredVariants = variantsData?.data.filter((variant) => {
    const isAlreadySelected = productVariants.some((item) => {
      return item.variantId === variant._id;
    });
    return !isAlreadySelected;
  });

  // restructure variants
  const variants = filteredVariants?.map((variant) => ({
    label: variant.variant_name,
    value: variant._id,
  }));

  //  re structured options
  const options =
    optionsData?.data?.map((option) => ({
      label: option.option_name,
      value: option._id,
    })) || [];

  // handle select
  const handleSetValue = (value: string | string[]) => {
    if (typeof value === "string") {
      form.setValue("variant.variantId", value);
    } else {
      form.setValue("variant.options", value);
    }
  };

  // handle on variant add
  const handleOnVariantAdd = () => {
    dispatch(
      onOpen({
        title: "Create variant",
        description:
          "Enter a unique variant name to create new variant in your store.",
        children: <CreateVariant setValue={form.setValue} />,
      })
    );
  };

  // handle on option add
  const handleOnOptionAdd = () => {
    dispatch(
      onOpen({
        title: "Create options",
        description:
          "Enter a unique variant name to create new variant in your store.",
        children: (
          <CreateOption
            setValue={form.setValue}
            selectedOptions={optionsValue || []}
            variantId={variantId}
          />
        ),
      })
    );
  };

  // handle add product variant
  const handleAddProductVariant = () => {
    const addingVariants = [
      ...productVariants,
      { variantId: variantId, options: optionsValue },
    ];
    // clear variant
    form.setValue("variants", addingVariants);
    form.setValue("variant", { options: [], variantId: "" });
  };

  // when ever variant id will be changed the api will be called
  useEffect(() => {
    if (variantId) {
      setSkip(false);
    }
  }, [variantId]);

  return (
    <>
      <div
        className={cn("space-y-4 mb-4 ", !productVariants.length && "hidden")}
      >
        {productVariants?.length &&
          productVariants?.map((variant) => (
            <ProductVariantPreview
              key={variant.variantId}
              productVariant={variant}
              form={form}
            />
          ))}
      </div>
      <div className="flex space-x-4 items-center">
        {/* PREVIEW  */}

        {/* select variant name */}
        <OptionSelector
          onAdd={handleOnVariantAdd}
          isDisable={optionsValue?.length > 0}
          label="Name"
          value={variantId || ""}
          options={variants || []}
          setValue={handleSetValue}
          type="single"
          isLoading={isVariantFetching}
        />

        {/* select variant option */}
        <OptionSelector
          onAdd={handleOnOptionAdd}
          label="Options"
          isDisable={!variantId}
          value={optionsValue || []}
          options={options}
          setValue={handleSetValue}
          type="multi"
          isLoading={isOptionFetching}
        />

        <Button
          type="reset"
          className="mt-6"
          disabled={!optionsValue?.length}
          onClick={handleAddProductVariant}
        >
          Add
        </Button>
      </div>
    </>
  );
};

export default AddVariant;
