import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { cn } from "@/lib/utils";

const FormDialog = ({
  children,
  className,
  action,
}: {
  children: React.ReactNode;
  className?: string;
  action: string;
}) => {
  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          "flex basis-1/2 justify-center items-center h-8 m-2 duration-300",
          className
        )}
      >
        {action}
      </DialogTrigger>
      <DialogContent className="overflow-hidden p-0">{children}</DialogContent>
    </Dialog>
  );
};

export default FormDialog;
