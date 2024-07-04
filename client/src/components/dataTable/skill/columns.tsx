import { TSkill } from "@/types/skill.types";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";

export const columns: ColumnDef<TSkill>[] = [
  // Title column
  {
    header: "Label",
    cell: ({ row }) => {
      const title = row.original.label;
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

  // Created At column
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const createdAt = row.original.createdAt;
      const formattedCreatedAt = createdAt
        ? moment(createdAt).format("MMMM Do YYYY, h:mm a")
        : "N/A";
      return <p>{formattedCreatedAt}</p>;
    },
  },
];
