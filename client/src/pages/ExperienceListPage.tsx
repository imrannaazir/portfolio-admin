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
import { useGetAllExperienceQuery } from "@/redux/features/experience/experienceApi";
import { ExperienceDataTable } from "@/components/dataTable/experience/data-table";
import { columns } from "@/components/dataTable/experience/columns";

const ExperienceListPage = () => {
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

  const { data, isFetching } = useGetAllExperienceQuery(query, { skip });

  useEffect(() => {
    setSkip(false);
  }, [query]);

  useEffect(() => {
    dispatch(setMeta(data?.meta));
  }, [data?.meta, dispatch]);
  const experiences = data?.data || [];

  return (
    <Page title="Projects" action={<ProjectAction />}>
      <div className=" mx-auto">
        <ExperienceDataTable
          columns={columns}
          data={experiences}
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

export default ExperienceListPage;
