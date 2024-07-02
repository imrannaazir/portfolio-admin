import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import moment from "moment";
import { TExperience } from "@/types/experience.types";

export const columns: ColumnDef<TExperience>[] = [
  // Select column
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
  // Title column
  {
    header: "Title",
    cell: ({ row }) => {
      const title = row.original.title;
      return (
        <div>
          <p className="font-semibold text-gray-700">{title}</p>
        </div>
      );
    },
  },
  // Company Name column
  {
    header: "Company Name",
    cell: ({ row }) => {
      const companyName = row.original.company_name;
      return <p>{companyName}</p>;
    },
  },
  // Location column
  {
    header: "Location",
    cell: ({ row }) => {
      const location = row.original.location;
      return <p>{location}</p>;
    },
  },
  // Start Date column
  {
    header: "Start Date",
    cell: ({ row }) => {
      const startDate = row.original.start_date;
      const formattedStartDate = moment(startDate).format("MMMM YYYY");
      return <p>{formattedStartDate}</p>;
    },
  },
  // End Date column
  {
    header: "End Date",
    cell: ({ row }) => {
      const endDate = row.original.end_date;
      const formattedEndDate = endDate
        ? moment(endDate).format("MMMM YYYY")
        : "Present";
      return <p>{formattedEndDate}</p>;
    },
  },
  // Currently Working column
  {
    header: "Currently Working",
    cell: ({ row }) => {
      const isWorking = row.original.isWorking;
      return <p>{isWorking ? "Yes" : "No"}</p>;
    },
  },
];
