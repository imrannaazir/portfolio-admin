/* import AddOrEditProductForm from "@/components/forms/AddOrEditProductForm";
import { useGetProductByIdQuery } from "@/redux/features/product/productApi";
import { setDefaultValues } from "@/redux/features/product/productSlice";
import { assignTag } from "@/redux/features/tag/tagSlice";
import { useAppDispatch } from "@/redux/hooks";
import { TCollection } from "@/types/product.type";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdateProduct = () => {
  const dispatch = useAppDispatch();

  const { id: initialId } = useParams();
  const [id, setId] = useState(initialId);

  const { data, isLoading } = useGetProductByIdQuery(id);

  useEffect(() => {
    if (!isLoading && data) {
      const { tags, brand, ...restProductData } = data.data;

      // Save selected tags in the redux store
      tags?.forEach((tag: TCollection) => {
        dispatch(assignTag(tag));
      });

      // Update defaultValues
      dispatch(
        setDefaultValues({
          ...restProductData,
          brand: brand?._id,
          tags: tags.map((tag: TCollection) => tag._id),
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, data, isLoading, dispatch]);

  useEffect(() => {
    setId(initialId);
  }, [initialId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <section className="pb-6">
      <AddOrEditProductForm productIdToUpdate={id} />
    </section>
  );
};

export default UpdateProduct;
 */
