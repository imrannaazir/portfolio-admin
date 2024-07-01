import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import moment from "moment";
import { TCategory } from "@/types";
import CategoryDataTableAction from "./data-table-action";

export const columns: ColumnDef<TCategory>[] = [
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
        row.original?.image?.url ||
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
    header: "Collection",
    cell: ({ row }) => {
      const collectionName = row.original.collection?.title || "N/A";
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
    header: "Products",
    accessorKey: "noOfProducts",
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => {
      return <CategoryDataTableAction row={row} />;
    },
  },
];
