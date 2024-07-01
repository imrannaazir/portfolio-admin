import { BiEdit } from "react-icons/bi";
import { IoTrashOutline } from "react-icons/io5";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaEllipsis } from "react-icons/fa6";
import { Row } from "@tanstack/react-table";
import { TCollection } from "@/types";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/redux/hooks";
import {
  setIsLoading,
  setIsOpen,
  setOnConfirm,
} from "@/redux/features/modal/alertModal.slice";
import { useDeleteSingleCollectionMutation } from "@/redux/features/collection/collection.api";
import { toast } from "sonner";

const CollectionDataTableAction = ({ row }: { row: Row<TCollection> }) => {
  const [deleteSingleCollection] = useDeleteSingleCollectionMutation();
  const collectionId = row.original._id;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // on confirm
  const onConfirm = async () => {
    dispatch(setIsLoading(true));
    try {
      const res = await deleteSingleCollection(collectionId).unwrap();
      if (res.success) {
        toast.success("Deleted successfully.", { duration: 2000 });
        dispatch(setIsOpen(false));
        dispatch(setIsLoading(false));
      }
    } catch (error) {
      toast.error(`Failed to delete.`, { duration: 2000 });

      // dispatch(onClose());
      dispatch(setIsOpen(false));
      dispatch(setIsLoading(false));
    }
  };
  // on update
  const onUpdate = () => {
    navigate(`/contents/add-collection/${collectionId}`);
  };

  // on delete
  const onDelete = () => {
    dispatch(setOnConfirm(onConfirm));
    dispatch(setIsOpen(true));
  };
  const collectionActions = [
    {
      title: "Edit collection",
      icon: <BiEdit className="mr-2 h-4 w-4" />,
      fn: onUpdate,
    },
    {
      title: "Delete collection",
      icon: <IoTrashOutline className="mr-2 h-4 w-4" />,
      fn: onDelete,
      className: "text-red-500",
    },
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="relative" size={"icon"}>
          <FaEllipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px] absolute -right-5">
        <DropdownMenuGroup>
          {collectionActions.map((action, i) => (
            <DropdownMenuItem
              key={i}
              onClick={action.fn}
              className={cn(action.className)}
            >
              {action.icon}
              <span>{action.title}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CollectionDataTableAction;
