import { columns } from "@/components/dataTable/product/columns";
import Page from "@/components/layout/Page";
import { Button } from "@/components/ui/button";
import {
  selectLimit,
  selectOrderBy,
  selectPage,
  selectSearchTerm,
  selectSortBy,
  setMeta,
} from "@/redux/features/filter/filterSlice";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetAllProductQuery } from "@/redux/features/project/projectApi";
import { ProductDataTable } from "@/components/dataTable/product/data-table";

const ProductListPage = () => {
  // invoke hooks

  const [skip, setSkip] = useState(true);

  const dispatch = useAppDispatch();
  const page = useAppSelector(selectPage);
  const limit = useAppSelector(selectLimit);
  const sort = useAppSelector(selectSortBy) || "createdAt";
  const order = useAppSelector(selectOrderBy);
  const searchTerm = useAppSelector(selectSearchTerm);

  // query parameter
  const query = queryString.stringify({
    page,
    limit,
    sort: order === "asc" ? `${sort}` : `-${sort}`,
    searchTerm,
  });

  const { data, isFetching } = useGetAllProductQuery(query, { skip });

  useEffect(() => {
    setSkip(false);
  }, [query]);

  useEffect(() => {
    dispatch(setMeta(data?.meta));
  }, [data?.meta, dispatch]);
  const products = data?.data || [];

  return (
    <Page title="Products" action={<ProductAction />}>
      <div className=" mx-auto">
        <ProductDataTable
          columns={columns}
          data={products}
          isLoading={isFetching}
        />
      </div>
    </Page>
  );
};

const ProductAction = () => {
  return (
    <Link to="/products/new">
      <Button size={"sm"}>Add product</Button>;
    </Link>
  );
};

export default ProductListPage;
