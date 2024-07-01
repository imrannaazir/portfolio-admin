import { CategoryDataTable } from "@/components/dataTable/category/data-table";
import { columns } from "@/components/dataTable/category/columns";
import Page from "@/components/layout/Page";
import { Button } from "@/components/ui/button";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
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

const CategoryListPage = () => {
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

  const { data, isFetching } = useGetAllCategoriesQuery(query, { skip });

  useEffect(() => {
    setSkip(false);
  }, [query]);

  useEffect(() => {
    dispatch(setMeta(data?.meta));
  }, [data?.meta, dispatch]);
  const categories = data?.data || [];
  return (
    <Page title="Categories" action={<CategoryAction />}>
      <div className=" mx-auto">
        <CategoryDataTable
          columns={columns}
          data={categories}
          isLoading={isFetching}
        />
      </div>
    </Page>
  );
};

const CategoryAction = () => {
  return (
    <Link to="/contents/add-category/new">
      <Button size={"sm"}>Create Category</Button>;
    </Link>
  );
};

export default CategoryListPage;
