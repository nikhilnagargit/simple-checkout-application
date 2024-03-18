// "use client";
// import { boolean, z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useFieldArray, useForm } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { useToast } from "@/components/ui/use-toast";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   CirclePlus,
//   CloudUpload,
//   Cross,
//   Minus,
//   Pen,
//   Pencil,
//   Trash,
//   X,
// } from "lucide-react";
// import { FancyMultiSelect } from "./multi-select-input";
// import { cn } from "@/lib/utils";

// import React from "react";

// const ShippingMethodInput = ({}) => {
//   return (
//     <>
//       {/* {shippingMethodField.ranges.map((range, rangeIndex) => (
//         <FormField
//           disabled={!editMode}
//           control={form.control}
//           name={`shippingMethods.${shippingMethodIndex}.ranges.${rangeIndex}.min`}
//           render={({ field }) => (
//             <FormItem>
//               <FormControl>
//                 <Input placeholder="amount" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//       ))} */}
//     </>
//   );
// };

// export default ShippingMethodInput;
// {
//   /*mapping through nested field ranges */
// }
// {
//   /* {fields.map((rangeField, rangeIndex) => (
//                                 <>
//                                   <FormField
//                                     disabled={!editMode}
//                                     control={form.control}
//                                     name={`rangeField.${rangeIndex}.name`}
//                                     render={({ field }) => (
//                                       <FormItem>
//                                         <FormLabel>
//                                           Shipping Zone Name
//                                         </FormLabel>
//                                         <FormControl>
//                                           <Input placeholder="" {...field} />
//                                         </FormControl>
//                                         <FormMessage />
//                                       </FormItem>
//                                     )}
//                                   />
//                                   <div className="col-span-2 flex items-center">
//                                     <Input
//                                       // {...field}

//                                       placeholder="min weight (gm)"
//                                       className={cn(
//                                         "border-x-0 col-span-3 border-t-0 focus-visible:ring-transparent focus-visible:border-b-primary rounded-none"
//                                       )}
//                                     />
//                                     <p>-</p>
//                                   </div>
//                                   <div className="col-span-2">
//                                     <Input
//                                       // {...field}
//                                       placeholder="max weight (gm)"
//                                       className={cn(
//                                         "border-x-0 col-span-3 border-t-0 focus-visible:ring-transparent focus-visible:border-b-primary rounded-none"
//                                       )}
//                                     />
//                                   </div>
//                                   <div className="col-span-2 flex items-center">
//                                     <p>$</p>
//                                     <Input
//                                       // {...field}
//                                       placeholder="amount"
//                                       className={cn(
//                                         "border-x-0 col-span-3 border-t-0 focus-visible:ring-transparent focus-visible:border-b-primary rounded-none"
//                                       )}
//                                     />
//                                   </div>
//                                 </>
//                               ))} */
// }

// {
//   /* <Button
//                                 type="button"
//                                 className="text-primary col-span-1"
//                                 variant={"ghost"}
//                                 title="Add row">
//                                 <CirclePlus size={20}></CirclePlus>
//                               </Button> */
// }

// // <Button
// //   type="button"
// //   className="text-destructive col-span-1"
// //   variant={"ghost"}
// //   title="Delete Shipping Method"
// //   onClick={() => {
// //     remove(shippingMethodIndex);
// //   }}>
// //   <Trash size={20}></Trash>
// // </Button>

// //     <Button
// //     type="button"
// //     variant="secondary"
// //     size="sm"
// //     className="mt-2"
// //     onClick={() =>
// //       append({ name: "", ranges: [{ from: 34, amount: 23, to: 34 }] })
// //     }>
// //     + Add Method
// //   </Button>

// import { boolean, z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useFieldArray, useForm } from "react-hook-form";

// import { cn } from "@/lib/utils";

// interface ShippingZoneFormProps {
//   editMode: boolean;
// }

// // main form component of this page
// const ShippingZoneForm = ({ editMode }: ShippingZoneFormProps) => {
//   // define the toast component
//   const { toast } = useToast();

//   // just show the submitted data in a toast
//   function onSubmit(data: ShippingZoneFormValues) {
//     console.log(data);
//     toast({
//       title: "You submitted the following values:",
//       description: (
//         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
//           <code className="text-white">{JSON.stringify(data, null, 2)}</code>
//         </pre>
//       ),
//     });
//   }

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
//         <div className="grid grid-cols-3 gap-6">
//           <div className="col-span-2 space-y-2">
//             <FormField
//               disabled={!editMode}
//               control={form.control}
//               name="name"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Shipping Zone Name</FormLabel>
//                   <FormControl>
//                     <Input placeholder="" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormLabel>Add Shipping Methods</FormLabel>
//             {fields.map((shippingMethodField, shippingMethodIndex) => {
//               return (
//                 <FormField
//                   key={shippingMethodField.id}
//                   // className="border p-4 grid grid-cols-7 rounded-md items-center justify-items-center gap-2"
//                   control={form.control}
//                   name={`shippingMethods.${shippingMethodIndex}.name`}
//                   render={({ field }) => {
//                     return (
//                       <FormItem>
//                         <Input
//                           {...field}
//                           placeholder="Name"
//                           className={cn(
//                             " border-x-0 col-span-6 border-t-0 focus-visible:ring-transparent focus:ring-0 focus-visible:border-b-primary rounded-none"
//                           )}
//                         />

//                         <FormMessage />
//                       </FormItem>
//                     );
//                   }}
//                 />
//               );
//             })}
//           </div>
//         </div>
//         <div className="flex gap-6">

//         </div>
//       </form>
//     </Form>
//   );
// };

// export default ShippingZoneForm;
