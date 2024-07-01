/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { useUploadSingleImageMutation } from "@/redux/features/image/image.api";
import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";
import { Button } from "./button";
import { LucideImagePlus, Trash } from "lucide-react";
import { UseFormSetValue } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { ClassValue } from "clsx";

type TUploadImageProps = {
  isDisable?: boolean;
  fieldName: string;
  className?: ClassValue;
  children?: ReactNode;
  loader?: ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue?: UseFormSetValue<any>;
  fieldValue: string | string[];
  type?: "single" | "multi";
};

type TImageUrl = { _id: string; url: string };

const UploadImage: FC<TUploadImageProps> = ({
  fieldName,
  setValue,
  className,
  children,
  loader,
  fieldValue,
  type,
}) => {
  // invoke hooks
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const UploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  // local state
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | TImageUrl[]>(
    type === "multi" ? [] : ""
  );
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [UploadImage] = useUploadSingleImageMutation();

  // handle remove image
  const handleRemoveImage = (_id: string) => {
    const filteredImageUrls = (imageUrl as TImageUrl[]).filter(
      (imageUrl) => imageUrl._id !== _id
    );
    const filteredFieldValue = (fieldValue as string[]).filter(
      (value) => value !== _id
    );
    setImageUrl(filteredImageUrls);
    if (setValue) {
      setValue(fieldName, filteredFieldValue);
    }
  };

  useEffect(() => {
    (async () => {
      if (image) {
        setIsImageUploading(true);
        const formData = new FormData();
        formData.append("file", image);
        formData.append("cloud_name", cloudName);
        formData.append("upload_preset", UploadPreset);
        formData.append("folder", "e-commerce");

        try {
          const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            {
              method: "POST",
              body: formData,
            }
          );
          const data = await response.json();
          if (data.secure_url) {
            const res = await UploadImage({
              file_name: data.original_filename,
              size: data.bytes / 1000,
              url: data.secure_url,
              format: data.format,
            }).unwrap();

            if (res.success) {
              toast.success("Image uploaded.", { duration: 2000 });
              if (
                setValue &&
                fieldName &&
                type === "multi" &&
                typeof fieldValue === "object"
              ) {
                setValue(fieldName, [...fieldValue, res.data._id]);
                (setImageUrl as Dispatch<SetStateAction<any>>)([
                  ...imageUrl,
                  { _id: res.data._id as string, url: res.data.url as string },
                ]);
              } else {
                setImageUrl(res.data.url);
                if (setValue) {
                  setValue(fieldName, res.data._id);
                }
              }
            }

            setImage(null);
            setIsImageUploading(false);
          }
        } catch (error) {
          toast.error("Failed to upload", { duration: 2000 });
          setIsImageUploading(false);
        }
      }
    })();
  }, [
    UploadPreset,
    cloudName,
    fieldName,
    fieldValue,
    image,
    imageUrl,
    setValue,
    type,
    UploadImage,
  ]);

  let UploadingButton: ReactNode = null;

  if (children) {
    if (loader && isImageUploading) {
      UploadingButton = loader;
    } else {
      UploadingButton = children;
    }
  } else if (
    !children &&
    !loader &&
    type === "multi" &&
    typeof imageUrl !== "string"
  ) {
    const uploadArea = (
      <label htmlFor={fieldName} className="cursor-pointer">
        <div
          className={cn(
            " border-2 border-dashed h-[200px] rounded-md flex items-center justify-center"
          )}
        >
          {isImageUploading ? (
            <AiOutlineLoading3Quarters className="w-6 h-6 animate-spin duration-500" />
          ) : (
            <LucideImagePlus className="w-10 h-10 text-gray-500" />
          )}
        </div>
      </label>
    );
    UploadingButton = imageUrl.length ? (
      <div
        className={cn(
          "grid  gap-2 items-center",
          imageUrl.length > 1 ? "grid-cols-4" : "grid-cols-2"
        )}
      >
        {imageUrl.map((img, i) => (
          <div
            key={img._id}
            className={cn(
              "h-[200px] border rounded-md p-4 flex items-center justify-center relative",
              imageUrl.length > 1 &&
                i === 0 &&
                "col-span-2 row-span-2 h-[400px] "
            )}
          >
            <img src={img.url} />

            <Button
              type="reset"
              onClick={() => handleRemoveImage(img._id)}
              size={"icon"}
              variant={"destructive"}
              className="absolute right-2 top-2"
            >
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        ))}

        {uploadArea}
      </div>
    ) : (
      uploadArea
    );
  } else {
    UploadingButton = (
      <label htmlFor={fieldName} className="cursor-pointer">
        <div
          className={cn(
            "mt-2 border-2 border-dashed h-[200px] rounded-md flex items-center justify-center"
          )}
        >
          {isImageUploading ? (
            <AiOutlineLoading3Quarters className="w-6 h-6 animate-spin duration-500" />
          ) : imageUrl ? (
            <img className="max-h-[180px]" src={imageUrl as string} />
          ) : (
            <LucideImagePlus className="w-10 h-10 text-gray-500" />
          )}
        </div>
      </label>
    );
  }

  return (
    <div className={cn("relative  w-full", className)}>
      <input
        id={fieldName}
        disabled={isImageUploading}
        type="file"
        className="hidden"
        onChange={(e) => {
          const selectedFile = e.target.files && e.target.files[0];
          if (selectedFile) {
            setImage(selectedFile);
          }
        }}
        accept="image/*"
      />

      {UploadingButton}

      <Button
        type="reset"
        onClick={() => {
          if (setValue && fieldName) {
            setValue(fieldName, "");
          }
          setImageUrl("");
          // setImage(null);
        }}
        variant={"destructive"}
        size={"icon"}
        className={cn(
          !imageUrl ? "hidden" : "absolute left-2 top-2",
          !setValue && "hidden",
          type === "multi" && "hidden"
        )}
      >
        <Trash className="w-4 h-4" />
      </Button>
    </div>
  );
};
export default UploadImage;
