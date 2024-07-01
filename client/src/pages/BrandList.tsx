import { columns } from "@/components/dataTable/brand/columns";
import { BrandDataTable } from "@/components/dataTable/brand/data-table";
import Page from "@/components/layout/Page";
import { Button } from "@/components/ui/button";
import { useGetAllBrandsQuery } from "@/redux/features/brand/brandApi";
import {
  selectLimit,
  selectOrderBy,
  selectPage,
  selectSearchTerm,
  selectSortBy,
  setMeta,
} from "@/redux/features/filter/filterSlice";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TBrand } from "@/types";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BrandListPage = () => {
  // invoke hooks

  const [skip, setSkip] = useState(true);

  const dispatch = useAppDispatch();
  const page = useAppSelector(selectPage);
  const limit = useAppSelector(selectLimit);
  const sort = useAppSelector(selectSortBy) || "createdAt";
  const order = useAppSelector(selectOrderBy) || "desc";
  const searchTerm = useAppSelector(selectSearchTerm);

  // query parameter
  const query = queryString.stringify({ page, limit, sort, searchTerm, order });
  const { data, isFetching } = useGetAllBrandsQuery(query, { skip });

  useEffect(() => {
    setSkip(false);
  }, [query]);

  useEffect(() => {
    dispatch(setMeta(data?.meta));
  }, [data?.meta, dispatch]);
  const brands = data?.data || ([] as TBrand[]);
  return (
    <Page title="Brands" action={<CollectionAction />}>
      <div className=" mx-auto">
        <BrandDataTable
          columns={columns}
          data={brands as TBrand[]}
          isLoading={isFetching}
        />
      </div>
    </Page>
  );
};

const CollectionAction = () => {
  return (
    <Link to="/contents/add-brand/new">
      <Button size={"sm"}>Create brand</Button>;
    </Link>
  );
};

export default BrandListPage;
