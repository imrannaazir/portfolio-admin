import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useState } from "react";
import TableSkeleton from "@/components/ui/table-skeleton";
import CollectionDataTableToolbar from "../data-table-toolbar";
import DataTableHeader from "../data-table-header";
import { useAppDispatch } from "@/redux/hooks";
import { DataTablePagination } from "../data-table-pagination";
import {
  setIsLoading,
  setIsOpen,
} from "@/redux/features/modal/alertModal.slice";
import { useDeleteManyCollectionsMutation } from "@/redux/features/collection/collection.api";
import { toast } from "sonner";

interface CollectionDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading: boolean;
}

export function CollectionDataTable<TData, TValue>({
  columns,
  data,
  isLoading,
}: CollectionDataTableProps<TData, TValue>) {
  const dispatch = useAppDispatch();
  const [deleteManyCollection] = useDeleteManyCollectionsMutation();
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });

  // delete collections
  const onDelete = async (ids: string[]) => {
    dispatch(setIsLoading(true));

    try {
      const res = await deleteManyCollection({ ids }).unwrap();
      if (res.success) {
        toast.success("Deleted successfully.", { duration: 2000 });
        dispatch(setIsOpen(false));
        dispatch(setIsLoading(false));
        setRowSelection({});
      }
    } catch (error) {
      toast.error(`Failed to delete.`, { duration: 2000 });
      dispatch(setIsOpen(false));
      dispatch(setIsLoading(false));
    }
  };

  const sortByItems = [
    {
      value: "title",
      label: "Collection title",
    },
    {
      value: "updatedAt",
      label: "Updated",
    },
    {
      value: "noOfProducts",
      label: "Products Number",
    },
  ];

  return (
    <div className="space-y-4">
      <CollectionDataTableToolbar sortByItems={sortByItems} />
      <div className="rounded-md border">
        <Table>
          <DataTableHeader table={table} fn={onDelete} />
          {isLoading ? (
            <TableSkeleton columnNo={5} rowNo={10} />
          ) : (
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
