import { columns } from "@/components/dataTable/project/columns";
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
import { ProjectDataTable } from "@/components/dataTable/project/data-table";
import { useGetAllProjectsQuery } from "@/redux/features/project/projectApi";

const ProjectListPage = () => {
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

  const { data, isFetching } = useGetAllProjectsQuery(query, { skip });

  useEffect(() => {
    setSkip(false);
  }, [query]);

  useEffect(() => {
    dispatch(setMeta(data?.meta));
  }, [data?.meta, dispatch]);
  const projects = data?.data || [];

  return (
    <Page title="Projects" action={<ProjectAction />}>
      <div className=" mx-auto">
        <ProjectDataTable
          columns={columns}
          data={projects}
          isLoading={isFetching}
        />
      </div>
    </Page>
  );
};

const ProjectAction = () => {
  return (
    <Link to="/projects/new">
      <Button size={"sm"}>Add Project</Button>;
    </Link>
  );
};

export default ProjectListPage;
