import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import moment from "moment";
import { TBrand } from "@/types";
import BrandDataTableAction from "./data-table-action";

export const columns: ColumnDef<TBrand>[] = [
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
    header: "Name",
    cell: ({ row }) => {
      const name = row.original.name;
      // const format = row?.original?.image?.url;
      const imageUrl =
        row.original?.logo?.url ||
        "https://i.pinimg.com/564x/0c/bb/aa/0cbbaab0deff7f188a7762d9569bf1b3.jpg";
      return (
        <div className="flex justify-start gap-2 items-center">
          <img
            className="w-10 h-10 border-2   rounded-md border-gray-100"
            src={imageUrl}
            alt=""
          />
          <div>
            <p className="font-semibold text-gray-700">{name}</p>
          </div>
        </div>
      );
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
      return <BrandDataTableAction row={row} />;
    },
  },
];
