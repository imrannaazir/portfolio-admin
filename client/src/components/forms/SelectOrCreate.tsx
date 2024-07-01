// /* eslint-disable @typescript-eslint/ban-types */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { camelCaseToWords, cn } from "@/lib/utils";
// import { Button } from "../ui/button";
// import { FormControl } from "../ui/form";
// import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
// import { CaretSortIcon } from "@radix-ui/react-icons";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
// } from "../ui/command";
// import { CheckIcon, PlusCircle } from "lucide-react";
// import { FC } from "react";
// import { Separator } from "../ui/separator";
// import { useAppDispatch } from "@/redux/hooks";
// import { onOpen } from "@/redux/features/modal/modalSlice";
// import { ClassValue } from "clsx";
// import { TCreateCollection } from "@/types/rtkQuery.type";
// import Icon from "../ui/lucide-icon";

// type TSelectOrCreateProps = {
//   collections: { name: string; _id: string; iconName?: any }[];
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   field?: any;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   form?: any;
//   collectionName: string;
//   className?: ClassValue;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
//   createCollection: TCreateCollection;
// };

// const SelectOrCreate: FC<TSelectOrCreateProps> = ({
//   collections,
//   field,
//   form,
//   collectionName,
//   className,
// }) => {
//   const dispatch = useAppDispatch();
//   return (
//     <>
//       <Popover>
//         <PopoverTrigger asChild>
//           <FormControl>
//             <Button
//               variant="outline"
//               role="combobox"
//               className={cn(
//                 className,
//                 "justify-between",
//                 !field.value && "text-muted-foreground"
//               )}
//             >
//               {field.value
//                 ? collections?.find(
//                     (collection) => collection._id === field.value
//                   )?.name
//                 : `Select ${camelCaseToWords(collectionName)}`}
//               <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//             </Button>
//           </FormControl>
//         </PopoverTrigger>
//         <PopoverContent
//           className={`${className} p-0 w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] mb-4`}
//         >
//           <Command>
//             <CommandInput
//               placeholder={`Search ${camelCaseToWords(collectionName)}...`}
//               className="h-9"
//             />
//             <CommandEmpty>
//               No {camelCaseToWords(collectionName)} found.
//             </CommandEmpty>
//             <CommandGroup>
//               {/* add new Collection */}
//               <CommandItem
//                 onSelect={() => {
//                   dispatch(onOpen(collectionName));
//                 }}
//                 className="flex items-center gap-2"
//               >
//                 <PlusCircle size={16} /> Add {collectionName}
//               </CommandItem>
//               <Separator className="mt-1" />
//               {collections?.map((collection) => (
//                 <CommandItem
//                   className="flex items-center gap-1"
//                   value={collection?.name}
//                   key={collection?._id}
//                   onSelect={() => {
//                     form.setValue(collectionName, collection?._id);
//                   }}
//                 >
//                   {collection?.iconName && (
//                     <Icon className="w-3 h-3" name={collection.iconName} />
//                   )}
//                   {collection?.name}
//                   <CheckIcon
//                     className={cn(
//                       "ml-auto h-4 w-4",
//                       collection?._id === field?.value
//                         ? "opacity-100"
//                         : "opacity-0"
//                     )}
//                   />
//                 </CommandItem>
//               ))}
//             </CommandGroup>
//           </Command>
//         </PopoverContent>
//       </Popover>
//     </>
//   );
// };

// export default SelectOrCreate;
