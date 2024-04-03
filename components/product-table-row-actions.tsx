import React, { useState } from "react";
import { Copy, Eye, Ghost, MoreVertical, Pencil, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Button } from "./ui/button";
import Link from "next/link";

// helper component
const Dialog = ({ open, product_id, handleDelete, setOpen }: any) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete the product?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanantely delete the product from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={async () => {
              await handleDelete(product_id);
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

const ProductTableRowActions = ({ product, handleDelete }: any) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex gap-6">
      <Dialog
        open={open}
        handleDelete={handleDelete}
        product_id={product.id}
        setOpen={setOpen}
      />
      <Button asChild size={"sm"} variant={"secondary"} className="h-8">
        <Link href={`/checkout/${product.id}`}> Generate Link</Link>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="text-muted-foreground">
          <Link href={`/products/${product.id}`}>
            <DropdownMenuItem className="flex gap-1 items-center">
              <Eye size={15} />
              View
            </DropdownMenuItem>
          </Link>
          {/* <DropdownMenuSeparator /> */}
          <Link href={`/products/${product.id}/edit`}>
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

export default ProductTableRowActions;
