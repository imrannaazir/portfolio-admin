// import { Image, Minus, Plus, Trash } from "lucide-react";
// import { Card, CardContent } from "../ui/card";
// import { Button } from "../ui/button";
// import {
//   TCartItem,
//   decreaseCartQuantity,
//   deleteFromCart,
//   increaseCartQuantity,
// } from "@/redux/features/cart/cartSlice";
// import { FC } from "react";
// import { useGetProductByIdQuery } from "@/redux/features/product/productApi";
// import { TProduct } from "@/types/product.type";
// import { useAppDispatch } from "@/redux/hooks";
// import { formatCurrency } from "@/lib/utils";
// import { toast } from "sonner";

// type TCartItemProps = {
//   item: TCartItem;
// };

// const CarItem: FC<TCartItemProps> = ({ item }) => {
//   const dispatch = useAppDispatch();
//   const { data, isFetching } = useGetProductByIdQuery(item._id);
//   const product: TProduct = data?.data || {};

//   // handle increase cart item
//   const handleIncreaseCart = () => {
//     dispatch(increaseCartQuantity(item._id));
//   };

//   //handle decrease cart item
//   const handleDecreaseCart = () => {
//     dispatch(decreaseCartQuantity(item._id));
//   };

//   //handle deleted
//   const handleDelete = () => {
//     dispatch(deleteFromCart(item._id));
//     toast.success("Removed from cart.", { duration: 2000 });
//   };

//   if (isFetching) <p>Loading..</p>;
//   return (
//     <div>
//       <Card>
//         <CardContent>
//           <div className="pt-6 flex flex-col lg:flex-row justify-between">
//             {/* flex no 1 */}
//             <div className="flex items-center col-span-6 space-x-6   ">
//               {/* <!-- cart image --> */}
//               {product?.image ? (
//                 <img
//                   className="max-w-[80px]"
//                   src={product?.image}
//                   alt="product"
//                 />
//               ) : (
//                 <Image className="w-[80px]" />
//               )}

//               {/* <!-- cart item info --> */}
//               <div className="space-y-2">
//                 <h4 className="text-xl font-semibold">{product?.name}</h4>
//                 <p className="text-sm ">{product?.category?.name}</p>
//                 <p className="text-sm ">{product?.brand?.name}</p>
//                 <p>
//                   USD <span className="">{formatCurrency(product?.price)}</span>
//                 </p>
//               </div>
//             </div>
//             {/* flex no 2 */}
//             <div className="flex items-center justify-center col-span-4 mt-4 space-x-8 md:mt-0 ">
//               {/* <!-- amount buttons --> */}
//               <div className="flex items-center space-x-4">
//                 <Button
//                   variant={"outline"}
//                   size={"icon"}
//                   disabled={
//                     !product?.quantity || item.quantity >= product.quantity
//                   }
//                   onClick={handleIncreaseCart}
//                 >
//                   <Plus size={14} />
//                 </Button>
//                 <span className="text-lg font-bold leading-7">
//                   {item.quantity}
//                 </span>
//                 <Button
//                   variant={"outline"}
//                   size={"icon"}
//                   disabled={item.quantity === 1}
//                   onClick={handleDecreaseCart}
//                 >
//                   <Minus size={14} />
//                 </Button>
//               </div>
//             </div>

//             {/* <!-- delete button --> */}
//             <div className=" flex flex-row-reverse lg:flex-col justify-between items-end">
//               <Button
//                 variant={"destructive"}
//                 size={"icon"}
//                 onClick={handleDelete}
//               >
//                 <Trash size={14} />
//               </Button>
//               {/* <!-- price --> */}
//               <p className="text-lg font-bold">
//                 USD{" "}
//                 <span>
//                   {formatCurrency(Number(item.price) * Number(item.quantity))}
//                 </span>
//               </p>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };
// export default CarItem;
