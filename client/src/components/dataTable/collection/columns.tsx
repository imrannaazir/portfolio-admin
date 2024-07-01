import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import moment from "moment";
import Icon from "@/components/ui/lucide-icon";
import CollectionDataTableAction from "./data-table-action";
import { TCollection } from "@/types";

export const columns: ColumnDef<TCollection>[] = [
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
    header: "Icon",
    cell: ({ row }) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const iconName: any = row?.original?.icon?.name || "ban";
      return <Icon className="text-gray-600 w-4 h-4" name={iconName} />;
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
      return <CollectionDataTableAction row={row} />;
    },
  },
];
