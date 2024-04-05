"use client";

import React from "react";
import ProductForm from "@/components/product-form";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
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
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

const Page = ({ params }: { params: { id: string } }) => {
  const supabase = createClient();
  const router = useRouter();

  // delete the product from db
  async function handleDelete() {
    const session = await supabase.auth.getSession();
    // check if user session is there
    if (session) {
      // delete the current record
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", params.id)
        .eq("user_id", session.data.session?.user.id);
      // if error in deletion
      if (error) {
        toast({
          title: "Delete failed.",
          description: (
            <p className="text-destructive">
              {error.message + " " + error.code}
            </p>
          ),
        });
      }
    }
    // go to the products page
    router.replace("/products");
  }
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          View Product Details
        </h2>
        <div className="flex gap-4 justify-end">
          <Link href={`/products/${params.id}/edit`}>
            <Button
              variant={"outline"}
              size={"sm"}
              className="text-primary flex gap-1">
              <Pencil size={15}></Pencil>
              Edit
            </Button>
          </Link>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant={"outline"}
                size={"sm"}
                className="text-destructive flex gap-1">
                <Trash size={15}></Trash>
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete the product?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanantely delete the product from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction asChild>
                  <Button onClick={handleDelete}>Yes</Button>
                </AlertDialogAction>
                <AlertDialogCancel>No</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <ProductForm editMode={false} product_id={params.id} />
    </div>
  );
};

export default Page;
