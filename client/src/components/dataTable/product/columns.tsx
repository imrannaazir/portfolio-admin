import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import moment from "moment";
import CategoryDataTableAction from "./data-table-action";
import { TProduct, TProductStatus } from "@/types/product.type";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<TProduct>[] = [
  // select column
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // image url column

  {
    header: "Title",
    cell: ({ row }) => {
      const title = row.original.title;
      // const format = row?.original?.image?.url;
      const imageUrl =
        row.original?.media?.[0]?.url ||
        "https://i.pinimg.com/564x/0c/bb/aa/0cbbaab0deff7f188a7762d9569bf1b3.jpg";
      return (
        <div className="flex justify-start gap-2 items-center">
          <img
            className="w-10 h-10 border-2   rounded-md border-gray-100"
            src={imageUrl}
            alt=""
          />
          <div>
            <p className="font-semibold text-gray-700">{title}</p>
          </div>
        </div>
      );
    },
  },

  {
    header: "Status",
    cell: ({ row }) => {
      const status: TProductStatus = row.original.status;
      return (
        <Badge
          variant={
            status === "ARCHIVED"
              ? "destructive"
              : status === "DRAFT"
              ? "secondary"
              : "default"
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    header: "Inventory",
    cell: ({ row }) => {
      const quantity = row.original.quantity;
      return (
        <p
          className={cn(
            quantity === 0 ? "text-destructive" : "text-foreground"
          )}
        >
          {quantity} in stock
        </p>
      );
    },
  },

  {
    header: "Collection",
    cell: ({ row }) => {
      const collectionName = row.original.collections?.[0]?.title || "N/A";
      return <p>{collectionName}</p>;
    },
  },
  {
    header: "Category",
    cell: ({ row }) => {
      const collectionName = row.original.categories?.[0]?.title || "N/A";
      return <p>{collectionName}</p>;
    },
  },
  {
    header: "Brand",
    cell: ({ row }) => {
      const collectionName = row.original?.brand?.name || "N/A";
      return <p>{collectionName}</p>;
    },
  },

  {
    accessorKey: "createdAt",
    header: "Date Added",
    cell: ({ row }) => {
      const date = row.original.createdAt;
      const now = moment(date).format("MMMM Do YYYY");
      return <p>{now}</p>;
    },
  },

  {
    id: "action",
    header: "Action",
    cell: ({ row }) => {
      return <CategoryDataTableAction row={row} />;
    },
  },
];
