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
import { useGetAllBlogQuery } from "@/redux/features/blog/blogApi";
import { BlogDataTable } from "@/components/dataTable/blog/data-table";
import { columns } from "@/components/dataTable/blog/columns";

const BlogListPage = () => {
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

  const { data, isFetching } = useGetAllBlogQuery(query, { skip });

  useEffect(() => {
    setSkip(false);
  }, [query]);

  useEffect(() => {
    dispatch(setMeta(data?.meta));
  }, [data?.meta, dispatch]);
  const blogs = data?.data?.data || [];

  console.log(blogs);

  return (
    <Page title="Blogs" action={<ProjectAction />}>
      <div className=" mx-auto">
        <BlogDataTable columns={columns} data={blogs} isLoading={isFetching} />
      </div>
    </Page>
  );
};

const ProjectAction = () => {
  return (
    <Link to="/blogs/new">
      <Button size={"sm"}>Add Blog</Button>;
    </Link>
  );
};

export default BlogListPage;
