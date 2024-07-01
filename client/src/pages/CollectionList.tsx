import { columns } from "@/components/dataTable/collection/columns";
import { CollectionDataTable } from "@/components/dataTable/collection/data-table";
import Page from "@/components/layout/Page";
import { Button } from "@/components/ui/button";
import { useGetAllCollectionsQuery } from "@/redux/features/collection/collection.api";
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

const CollectionListPage = () => {
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
  const { data, isFetching } = useGetAllCollectionsQuery(query, { skip });

  useEffect(() => {
    setSkip(false);
  }, [query]);

  useEffect(() => {
    dispatch(setMeta(data?.meta));
  }, [data?.meta, dispatch]);
  const collections = data?.data || [];
  return (
    <Page title="Collections" action={<CollectionAction />}>
      <div className=" mx-auto">
        <CollectionDataTable
          columns={columns}
          data={collections}
          isLoading={isFetching}
        />
      </div>
    </Page>
  );
};

const CollectionAction = () => {
  return (
    <Link to="/contents/add-collection/new">
      <Button size={"sm"}>Create collection</Button>;
    </Link>
  );
};

export default CollectionListPage;
