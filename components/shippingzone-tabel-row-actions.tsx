import React, { useState } from "react";
import { Eye, MoreVertical, Pencil, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import Link from "next/link";

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
} from "@/components/ui/alert-dialog";

// helper component
// helper component
const Dialog = ({ open, shippingzone_id, handleDelete, setOpen }: any) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete the Shipping Zone?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanantely delete the Shipping Zone from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={async () => {
              await handleDelete(shippingzone_id);
              setOpen(false);
            }}>
            Yes
          </AlertDialogAction>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            No
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
const ShippingZoneTableRowActions = ({ handleDelete, shipping_zone }: any) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex gap-6">
      <Dialog
        open={open}
        handleDelete={handleDelete}
        shippingzone_id={shipping_zone.id}
        setOpen={setOpen}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="text-muted-foreground">
          <Link href={`/shipping/${shipping_zone.id}`}>
            <DropdownMenuItem className="flex gap-1 items-center">
              <Eye size={15} />
              View
            </DropdownMenuItem>
          </Link>
          <Link href={`/shipping/${shipping_zone.id}/edit`}>
            <DropdownMenuItem className="flex gap-1 items-center">
              <Pencil size={15} />
              Edit
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem
            className="flex gap-1 items-center text-destructive"
            onClick={() => {
              setOpen(true);
            }}>
            <Trash size={15} />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ShippingZoneTableRowActions;
