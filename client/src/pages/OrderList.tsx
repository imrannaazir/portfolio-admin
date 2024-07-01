// import { useEffect, useState } from "react";
// import queryString from "query-string";
// import {
//   selectFilterByDate,
//   selectLimit,
//   selectPage,
//   setMeta,
// } from "@/redux/features/filter/filterSlice";
// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import Page from "@/components/layout/Page";
// import { Button } from "@/components/ui/button";

// const OrderList = () => {
//   // invoke hooks

//   // local state
//   const [skip, setSkip] = useState(true);

//   const dispatch = useAppDispatch();
//   const date = useAppSelector(selectFilterByDate);
//   const page = useAppSelector(selectPage);
//   const limit = useAppSelector(selectLimit);
//   // query parameter
//   const query = queryString.stringify({ date, page, limit });

//   // make skip  to get all product
//   useEffect(() => {
//     setSkip(false);
//   }, [query]);

//   return (
//     <Page title="Orders" action={<Button>Create Order</Button>}>
//       <div className=" mx-auto">
//         {/* <OrderDataTable columns={columns} data={orders} /> */}
//       </div>
//     </Page>
//   );
// };

// export default OrderList;
