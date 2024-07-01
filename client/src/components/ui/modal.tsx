import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { onClose, selectModal } from "@/redux/features/modal/modalSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const Modal = () => {
  const { isOpen, title, description, children, className } =
    useAppSelector(selectModal);
  const dispatch = useAppDispatch();
  const onChange = (open: boolean) => {
    if (!open) {
      dispatch(onClose());
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent
        className={cn(
          "overflow-y-scroll max-h-[90%] custom-scrollbar",
          className
        )}
      >
        <DialogHeader>
          <DialogTitle className="capitalize">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
