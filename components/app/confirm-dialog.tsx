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
} from "../ui/alert-dialog";

export interface AlertConfirmDialogProps extends AlertDialogRootProps {
  title: string;
  description: string;
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
    onConfirm,
    confirmText,
    confirmVariant,
    ...other
  } = props;

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <AlertDialog {...(other as any)}>
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
