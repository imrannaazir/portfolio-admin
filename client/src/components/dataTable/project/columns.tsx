import { ColumnDef } from "@tanstack/react-table";
import { TProject } from "@/types/project.type";
import ProjectDataTableAction from "./data-table-action";

export const columns: ColumnDef<TProject>[] = [
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

  // live link column
  {
    header: "Live Link",
    cell: ({ row }) => {
      const liveLink = row.original.liveLink;
      return (
        <a
          href={liveLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          {liveLink}
        </a>
      );
    },
  },
  // client GitHub column
  {
    header: "Client GitHub",
    cell: ({ row }) => {
      const clientGitHub = row.original.clientGitHub;
      return clientGitHub ? (
        <a
          href={clientGitHub}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          {clientGitHub}
        </a>
      ) : (
        <p>N/A</p>
      );
    },
  },
  // backend GitHub column
  {
    header: "Backend GitHub",
    cell: ({ row }) => {
      const backendGitHub = row.original.backendGitHub;
      return backendGitHub ? (
        <a
          href={backendGitHub}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          {backendGitHub}
        </a>
      ) : (
        <p>N/A</p>
      );
    },
  },
  // start date column

  // action column
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => {
      return <ProjectDataTableAction row={row} />;
    },
  },
];
