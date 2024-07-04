import HomePage from "@/pages/Home";
// import UpdateProduct from "@/pages/UpdateProduct";
import { Award, BookOpen, Briefcase, Home, Layers } from "lucide-react";
import { TPath } from "@/types";
import AddProjectPage from "@/pages/AddProject";
import ProjectListPage from "@/pages/ProjectList";
import AddExperiencePage from "@/pages/AddExperiencePage";
import ExperienceListPage from "@/pages/ExperienceListPage";
import AddBlogPage from "@/pages/AddBlog";
import BlogListPage from "@/pages/BlogListPage";
import AddSkillPage from "@/pages/AddSkillPage";
import SkillListPage from "@/pages/SkillListPage";

const paths: TPath[] = [
  {
    icon: <Home className="mr-2 h-4 w-4" />,
    index: true,
    element: <HomePage />,
  },
  {
    icon: <Home className="mr-2 h-4 w-4" />,
    path: "home",
    element: <HomePage />,
    label: "Home",
  },

  {
    icon: <Layers className="mr-2 h-4 w-4" />,
    label: "Project",
    path: "projects",
    children: [
      {
        path: `new`,
        label: "Add",
        element: <AddProjectPage />,
      },
      {
        path: `list`,
        label: "List",
        element: <ProjectListPage />,
      },
    ],
  },
  {
    icon: <Briefcase className="mr-2 h-4 w-4" />,
    label: "Experiences",
    path: "experiences",
    children: [
      {
        path: `new`,
        label: "Add",
        element: <AddExperiencePage />,
      },
      {
        path: `list`,
        label: "List",
        element: <ExperienceListPage />,
      },
    ],
  },
  {
    icon: <BookOpen className="mr-2 h-4 w-4" />,
    label: "Blogs",
    path: "blogs",
    children: [
      {
        path: `new`,
        label: "Add",
        element: <AddBlogPage />,
      },
      {
        path: `list`,
        label: "List",
        element: <BlogListPage />,
      },
    ],
  },
  {
    icon: <Award className="mr-2 h-4 w-4" />,
    label: "Skills",
    path: "skills",
    children: [
      {
        path: `new`,
        label: "Add",
        element: <AddSkillPage />,
      },
      {
        path: `list`,
        label: "List",
        element: <SkillListPage />,
      },
    ],
  },
];
export default paths;
