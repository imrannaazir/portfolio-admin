import AddProduct from "@/pages/AddProduct";
import HomePage from "@/pages/Home";
import ProductDetails from "@/pages/ProductDetails";
import ProductList from "@/pages/ProductList";
// import UpdateProduct from "@/pages/UpdateProduct";
import { BarChart2, Home, Images, ShoppingBag, User } from "lucide-react";
import { IoMdPricetag } from "react-icons/io";
import AddOrderPage from "@/pages/AddOrderPage";
import { TPath } from "@/types";
import AnalyticsPage from "../pages/Analytics";
import AddCustomer from "@/pages/AddCustomer";
import CustomerListPage from "@/pages/CustomerList";
import AddImagePage from "@/pages/AddImage";
import ImageListPage from "@/pages/ImageList";
import AddCollectionPage from "@/pages/AddCollection";
import CollectionListPage from "@/pages/CollectionList";
import AddCategoryPage from "@/pages/AddCategory";
import CategoryListPage from "@/pages/CategoryList";
import BrandListPage from "@/pages/BrandList";
import AddBrandsPage from "@/pages/AddBrand";
import AddVariantPage from "@/pages/AddVariant";

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
    icon: <ShoppingBag className="mr-2 h-4 w-4" />,
    label: "Orders",
    path: "orders",
    children: [
      {
        label: "Add",
        path: "new",
        element: <AddOrderPage />,
      },
    ],
  },
  {
    icon: <IoMdPricetag className="mr-2 h-4 w-4" />,
    label: "Product",
    path: "products",
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
      /* {
        path: "update/:id",
        element: <UpdateProduct />,
      }, */
      {
        path: ":id",
        element: <ProductDetails />,
      },
    ],
  },
  {
    icon: <User className="mr-2 h-4 w-4" />,
    label: "Customers",
    path: "customers",
    children: [
      {
        path: "new",
        label: "Add",
        element: <AddCustomer />,
      },
      {
        path: "list",
        label: "List",
        element: <CustomerListPage />,
      },
    ],
  },
  {
    icon: <Images className="mr-2 h-4 w-4" />,
    label: "Contents",
    path: "contents",
    children: [
      {
        index: true,
        element: <ImageListPage />,
      },
      {
        path: "add-image",
        element: <AddImagePage />,
      },
      {
        label: "Images",
        path: "images",
        element: <ImageListPage />,
      },
      {
        path: "add-collection/:id",
        element: <AddCollectionPage />,
      },
      {
        label: "Collections",
        path: "collections",
        element: <CollectionListPage />,
      },
      {
        path: "add-category/:id",
        element: <AddCategoryPage />,
      },
      {
        label: "Categories",
        path: "categories",
        element: <CategoryListPage />,
      },
      {
        path: "add-brand/:id",
        element: <AddBrandsPage />,
      },
      {
        label: "Brands",
        path: "brands",
        element: <BrandListPage />,
      },
      {
        path: "add-variant",
        element: <AddVariantPage />,
      },
    ],
  },
  {
    icon: <BarChart2 className="mr-2 h-4 w-4" />,
    label: "Analytics",
    path: "analytics",
    element: <AnalyticsPage />,
  },
];
export default paths;
