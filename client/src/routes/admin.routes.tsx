import AddProduct from "@/pages/AddProduct";
import HomePage from "@/pages/Home";
import ProductList from "@/pages/ProductList";
// import UpdateProduct from "@/pages/UpdateProduct";
import { Award, BookOpen, Briefcase, Home, Layers } from "lucide-react";
import { TPath } from "@/types";

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
        element: <AddProduct />,
      },
      {
        path: `list`,
        label: "List",
        element: <AddProduct />,
      },
    ],
  },
  /* 
  {
    icon: <Briefcase className="mr-2 h-4 w-4" />,
    label: "Experiences",
    path: "experiences",
    children: [
      {
        path: `new`,
        label: "Add",
        element: <AddProduct />,
      },
      {
        path: `list`,
        label: "List",
        element: <ProductList />,
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
        element: <AddProduct />,
      },
      {
        path: `list`,
        label: "List",
        element: <ProductList />,
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
        element: <AddProduct />,
      },
      {
        path: `list`,
        label: "List",
        element: <ProductList />,
      },
    ],
  }, */
];
export default paths;
