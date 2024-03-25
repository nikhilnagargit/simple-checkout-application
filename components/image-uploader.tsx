import React, { useRef, useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import axios, { AxiosProgressEvent, CancelTokenSource } from "axios";

import { ProductFormValues } from "./product-form";
import { UseFormReturn } from "react-hook-form";
import { CloudUpload } from "lucide-react";
import { Input } from "./ui/input";
import Image from "next/image";

import { Progress } from "./ui/progress";
import { register } from "module";

const ImageUploader = ({
  form,
  disabled,
}: {
  form: UseFormReturn<ProductFormValues>;
  disabled: boolean;
}) => {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [progressvalue, setProgressvalue] = React.useState(0);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const config = {
    onUploadProgress: (progressEvent: any) => {
      const progress = Math.round(
        (progressEvent.loaded / (progressEvent.total ?? 0)) * 100
      );
      // Update the progress bar here
      setProgressvalue(progress);
    },
  };

  const uploadImage = async (e: any) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", "nikhilnagarpreset");
    try {
      setLoading(true);
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dbigvpa3r/image/upload`,
        formData,
        config
      );
      console.log(response);
      setImage(response.data.secure_url);
      form.setValue("image", response.data.secure_url);
      // form.setValue("name", "nikhil");
      // form.setValue("image", image);
      setLoading(false);
      setProgressvalue(0);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setProgressvalue(0);
    }
  };

  return (
    <FormItem>
      <FormLabel>Product Image</FormLabel>

      {
        <div className="hover:bg-muted  max-w-[250px] h-[200px] border-dashed border-2 text-muted-foreground rounded-md flex flex-col items-center justify-center">
          <div
            className="relative w-full h-full flex justify-center"
            onClick={(e) => {
              imageInputRef.current?.click();
              e.stopPropagation();
            }}>
            {/* <input type="text" {...field} /> */}
            {image ? (
              <Image alt="img" fill={true} sizes="w-full h-full" src={image} />
            ) : (
              <div className="flex flex-col items-center justify-center">
                <CloudUpload size={50} strokeWidth={1} />
                <p>Upload Image</p>
              </div>
            )}
          </div>
          {loading && <Progress value={progressvalue} />}
          <Input
            id="dropzone-file"
            accept="image/png, image/jpeg"
            type="file"
            {...form.register("image")}
            onChange={uploadImage}
            ref={imageInputRef}
          />
        </div>
      }
      <FormMessage>{form.formState.errors.image?.message}</FormMessage>
    </FormItem>
  );
};

export default ImageUploader;
