import { AlertDialogRootProps } from "@base-ui/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

export interface AlertConfirmDialogProps extends AlertDialogRootProps {
  title: string;
  description: string;
  trigger?: React.ReactNode;
  onConfirm: () => void;
  confirmText?: string;
  confirmVariant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}

export function AlertConfirmDialog(props: AlertConfirmDialogProps) {
  const {
    title,
    description,
    trigger,
    onConfirm,
    confirmText,
    confirmVariant,
    ...other
  } = props;

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <AlertDialog {...(other as any)}>
      {trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
        </AlertDialogHeader>

        <AlertDialogDescription>{description}</AlertDialogDescription>

        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction variant={confirmVariant} onClick={onConfirm}>
            {confirmText || "Confirm"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
