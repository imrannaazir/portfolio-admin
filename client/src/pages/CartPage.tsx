// import BillDetails from "@/components/cart/BillDetails";
// import CarItem from "@/components/cart/CartItem";
// import { selectCartItems } from "@/redux/features/cart/cartSlice";
// import { useAppSelector } from "@/redux/hooks";
// import { FrownIcon } from "lucide-react";

// const CartPage = () => {
//   const cartItems = useAppSelector(selectCartItems);
//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
//       <div className="space-y-6 lg:col-span-2">
//         {cartItems.length < 1 && (
//           <h3 className="  m-4 text-lg flex justify-center gap-2 items-center">
//             <FrownIcon />
//             No product in the cart
//           </h3>
//         )}
//         {cartItems.map((item) => (
//           <CarItem key={item._id} item={item} />
//         ))}
//       </div>{/*  */}
//       <BillDetails />
//     </div>
//   );
// };

// export default CartPage;
