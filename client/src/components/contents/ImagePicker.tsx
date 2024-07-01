// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { FC, ReactNode, useEffect, useState } from "react";
// import UploadSingleImage from "../ui/image-upload";
// import { TImage } from "@/types/contents.type";
// import LoadingButton from "../ui/loading-button";
// import { Button } from "../ui/button";
// import { Trash } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { UseFormSetValue } from "react-hook-form";
// import { ClassValue } from "clsx";

// type TImagePickerProps = {
//   setValue: UseFormSetValue<any>;
//   className?: ClassValue;
//   label?: ReactNode;
//   fieldName: string;
// };

// const ImagePicker: FC<TImagePickerProps> = ({
//   setValue,
//   className,
//   fieldName = "image",
//   label = <p className="btn-primary">Upload image</p>,
// }) => {
//   const [image, setImage] = useState<TImage | null>(null);
//   useEffect(() => {
//     if (image?._id) {
//       setValue(fieldName, image._id);
//     }
//   }, [fieldName, image, setValue]);

//   return (
//     <>
//       <UploadSingleImage
//         isDisable={image !== null}
//         setUploadedImage={setImage}
//         loader={
//           <div
//             className={cn(
//               "mt-2 border-2 border-dashed h-[200px] rounded-md flex items-center justify-center",
//               className
//             )}
//           >
//             <LoadingButton />
//           </div>
//         }
//       >
//         <div
//           className={cn(
//             "mt-2 border-2 border-dashed h-[200px] rounded-md flex items-center justify-center",
//             className
//           )}
//         >
//           {image?.url ? (
//             <>
//               <img className="max-h-[180px]" src={image.url} />
//             </>
//           ) : (
//             label
//           )}
//         </div>
//       </UploadSingleImage>

//       {/* button to remove uploaded image */}
//       <Button
//         onClick={() => {
//           setValue("image", "");
//           setImage(null);
//         }}
//         variant={"destructive"}
//         size={"icon"}
//         className={cn(image?._id ? "absolute left-2 top-10" : "hidden")}
//       >
//         <Trash className="w-4 h-4" />
//       </Button>
//     </>
//   );
// };

// export default ImagePicker;
