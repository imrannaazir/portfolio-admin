import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Skeleton } from "./skeleton";
import { FC } from "react";

type TTableSkeletonProps = {
  columnNo: number;
  rowNo: number;
};

const TableSkeleton: FC<TTableSkeletonProps> = ({ columnNo, rowNo }) => {
  const generateArrByLength = (length: number): number[] => {
    const columnArr: number[] = [];
    for (let i = 0; i < length; i++) {
      columnArr.push(i);
    }

    return columnArr;
  };

  return (
    <TableBody>
      {generateArrByLength(rowNo).map((item) => (
        <TableRow key={item}>
          {generateArrByLength(columnNo).map((item) => (
            <TableCell key={item}>
              <Skeleton className={`h-4 w-[${100 / columnNo}]%`} />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default TableSkeleton;
