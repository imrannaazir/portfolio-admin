// import { ColumnDef } from "@tanstack/react-table";
// import { Checkbox } from "@/components/ui/checkbox";
// import { TOrder } from "@/types/order.type";

// export const columns: ColumnDef<TOrder>[] = [
//   {
//     id: "select",
//     header: ({ table }) => (
//       <Checkbox
//         checked={
//           table.getIsAllPageRowsSelected() ||
//           (table.getIsSomePageRowsSelected() && "indeterminate")
//         }
//         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//         aria-label="Select all"
//       />
//     ),
//     cell: ({ row }) => (
//       <Checkbox
//         checked={row.getIsSelected()}
//         onCheckedChange={(value) => row.toggleSelected(!!value)}
//         aria-label="Select row"
//       />
//     ),
//     enableSorting: false,
//     enableHiding: false,
//   },
//   {
//     accessorKey: "products",
//     header: "Product",
//     cell: ({ row }) => {
//       const dummyImage =
//         "https://t3.ftcdn.net/jpg/03/45/05/92/360_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg";

//       return (
//         <div className="flex -space-x-5 rtl:space-x-reverse">
//           {row.original.products.slice(0.3).map((product) => (
//             <div key={product.product._id}>
//               <img
//                 className="w-10 h-10 border-2   rounded-full border-gray-800"
//                 src={product.product.image ? product.product.image : dummyImage}
//                 alt=""
//               />
//             </div>
//           ))}

//           {row.original.products.length > 3 && (
//             <div className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800">
//               +99
//             </div>
//           )}
//         </div>
//       );
//     },
//   },
//   {
//     accessorKey: "buyer_contact",
//     header: "Customer Contact No",
//     cell: ({ row }) => {
//       const contactNo = row.getValue("buyer_contact");

//       return (
//         <div className="font-semibold">{(contactNo as string) || "N/A"}</div>
//       );
//     },
//   },
//   {
//     accessorKey: "buyer_name",
//     header: "Customer name",
//   },

//   {
//     header: "Quantity",
//     cell: ({ row }) => {
//       const quantity = row.original.products.reduce(
//         (total, product) => product.quantity + total,
//         0
//       );
//       return <p>{quantity}</p>;
//     },
//   },

//   {
//     accessorKey: "totalCost",
//     header: "Total",
//     cell: ({ row }) => {
//       const price = parseFloat(row.getValue("totalCost"));
//       const formattedPrice = new Intl.NumberFormat("en-US", {
//         style: "currency",
//         currency: "USD",
//       }).format(price);

//       return <div className="font-semibold">{formattedPrice}</div>;
//     },
//   },
// ];
