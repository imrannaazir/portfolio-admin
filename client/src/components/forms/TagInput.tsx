// /* eslint-disable @typescript-eslint/ban-types */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { cn } from "@/lib/utils";
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
// import { MutationTrigger } from "node_modules/@reduxjs/toolkit/dist/query/react/buildHooks";
// import {
//   BaseQueryFn,
//   FetchArgs,
//   FetchBaseQueryError,
//   FetchBaseQueryMeta,
//   MutationDefinition,
// } from "@reduxjs/toolkit/query";
// import { useAppDispatch } from "@/redux/hooks";
// import { onOpen } from "@/redux/features/modal/modalSlice";
// import { ClassValue } from "clsx";
// import { assignTag } from "@/redux/features/tag/tagSlice";

// type TSelectOrCreateProps = {
//   collections: { name: string; _id: string }[];
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   field: any;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   form: any;
//   collectionName: string;
//   className?: ClassValue;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
//   createCollection: MutationTrigger<
//     MutationDefinition<
//       any,
//       BaseQueryFn<
//         string | FetchArgs,
//         unknown,
//         FetchBaseQueryError,
//         {},
//         FetchBaseQueryMeta
//       >,
//       never,
//       any,
//       "api"
//     >
//   >;
// };

// const TagInput: FC<TSelectOrCreateProps> = ({
//   collections,
//   field,
//   form,
//   collectionName,
//   className = "w-[200px]",
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
//               Select {collectionName}
//               <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//             </Button>
//           </FormControl>
//         </PopoverTrigger>
//         <PopoverContent className={`${className} p-0 `}>
//           <Command>
//             <CommandInput
//               placeholder={`Search ${collectionName}...`}
//               className="h-9"
//             />
//             <CommandEmpty>No {collectionName} found.</CommandEmpty>
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
//                   value={collection.name}
//                   key={collection._id}
//                   onSelect={() => {
//                     const tagValues = form?.getValues("tags");

//                     form.setValue(collectionName, [
//                       ...tagValues,
//                       collection._id,
//                     ]);
//                     dispatch(assignTag(collection));
//                   }}
//                 >
//                   {collection.name}
//                   <CheckIcon
//                     className={cn(
//                       "ml-auto h-4 w-4",
//                       collection._id === field.value
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

// export default TagInput;
