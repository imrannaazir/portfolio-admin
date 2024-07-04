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
import { useGetAllSkillQuery } from "@/redux/features/skill/skillApi";
import { SkillDataTable } from "@/components/dataTable/skill/data-table";
import { columns } from "@/components/dataTable/skill/columns";

const SkillListPage = () => {
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

  const { data, isFetching } = useGetAllSkillQuery(query, { skip });

  useEffect(() => {
    setSkip(false);
  }, [query]);

  useEffect(() => {
    dispatch(setMeta(data?.meta));
  }, [data?.meta, dispatch]);
  const skill = data?.data || [];

  return (
    <Page title="Skill" action={<ProjectAction />}>
      <div className=" mx-auto">
        <SkillDataTable columns={columns} data={skill} isLoading={isFetching} />
      </div>
    </Page>
  );
};

const ProjectAction = () => {
  return (
    <Link to="/skills/new">
      <Button size={"sm"}>Add Skill</Button>;
    </Link>
  );
};

export default SkillListPage;
