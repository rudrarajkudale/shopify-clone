import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Messsage from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetSSLStoreIdQuery,
  usePayOrderMutation,
} from "../../redux/api/orderApiSlice";

const Order = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [{ isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const {
    data: ssl,
    isLoading: loadingSsl,
    error: errorssl,
  } = useGetSSLStoreIdQuery();

  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    if (ssl && !loadingSsl && !errorssl) {
      setIsPending(false);
    }
  }, [ssl, loadingSsl, errorssl]);

  const handlePay = () => {

    fetch("http://localhost:8000/order/:id", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_id: orderId,
        total_amount: order.totalPrice,
        cus_name: userInfo.username,
        cus_email: userInfo.email,
        cus_add1: order.shippingAddress.address,
        cus_city: order.shippingAddress.city,
        cus_postcode: order.shippingAddress.postalCode,
        cus_country: order.shippingAddress.country,
        num_of_items: order.orderItems.length,
        product_name: order.orderItems.map((item) => item.name),
        product_amount: order.orderItems.map((item) => item.price),
      }),
    }).then((res) => res.json()).then((result) => {
      console.log(result);
      window.location.replace(result.url);
    });

  }

  /*
  
  All the transaction made using this environment are counted as test transaction and has no effect with accounting, URL starts with https://sandbox.sslcommerz.com.
  
  
  Test Credit Card Account Numbers
  
  VISA:
  
  Card Number: 4111111111111111
  Exp: 12/25
  CVV: 111
  Mastercard:
  
  Card Number: 5111111111111111
  Exp: 12/25
  CVV: 111
  American Express:
  
  Card Number: 371111111111111
  Exp: 12/25
  CVV: 111
  
  
  Mobile OTP: 111111 or 123456
    
  */

  const deliverHandler = async () => {
    await deliverOrder(orderId);
    refetch();
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Messsage variant="danger">{error.data.message}</Messsage>
  ) : (
    <div className="container flex flex-col gap-8 ml-[10rem] mt-12 md:flex-row">
      <div className="md:w-3/5 w-1/3 pr-4">
        <div className="border gray-300 mt-5 pb-4 mb-5">
          {order.orderItems.length === 0 ? (
            <Messsage>Order is empty</Messsage>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-[80%]">
                <thead className="border-b-2">
                  <tr>
                    <th className="p-2">Image</th>
                    <th className="p-2">Product</th>
                    <th className="p-2 text-center">Quantity</th>
                    <th className="p-2">Unit Price</th>
                    <th className="p-2">Total</th>
                  </tr>
                </thead>

                <tbody>
                  {order.orderItems.map((item, index) => (
                    <tr key={index}>
                      <td className="p-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover"
                        />
                      </td>

                      <td className="p-2">
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </td>

                      <td className="p-2 text-center">{item.qty}</td>
                      <td className="p-2 text-center">{item.price}</td>
                      <td className="p-2 text-center">
                        BDT {(item.qty * item.price).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <div className="md:w-2/5">
        <div className="mt-5 border-gray-300 pb-4 mb-4">
          <h2 className="text-xl font-bold mb-2">Shipping</h2>
          <p className="mb-4 mt-4">
            <strong className="text-indigo-500">Order:</strong> {order._id}
          </p>

          <p className="mb-4">
            <strong className="text-indigo-500">Name:</strong>{" "}
            {order.user.username}
          </p>

          <p className="mb-4">
            <strong className="text-indigo-500">Email:</strong> {order.user.email}
          </p>

          <p className="mb-4">
            <strong className="text-indigo-500">Address:</strong>{" "}
            {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
            {order.shippingAddress.postalCode}, {order.shippingAddress.country}
          </p>

          <p className="mb-4">
            <strong className="text-indigo-500">Method:</strong>{" "}
            {order.paymentMethod}
          </p>

          {order.isPaid ? (
            <Messsage variant="success">Paid on {order.paidAt}</Messsage>
          ) : (
            <Messsage variant="danger">Not paid</Messsage>
          )}
        </div>
        <hr />
        <h2 className="text-xl font-bold mb-2 mt-[3rem]">Order Summary</h2>
        <div className="flex justify-between mb-2">
          <span>Items</span>
          <span>BDT {order.itemsPrice}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Shipping</span>
          <span>BDT {order.shippingPrice}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Tax</span>
          <span>BDT {order.taxPrice}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Total</span>
          <span>BDT {order.totalPrice}</span>
        </div>

        {!order.isPaid && (
          <div>
            {loadingPay && <Loader />}{" "}
            {isPending ? (
              <Loader />
            ) : (
              <div>
                <div>
                  <button onClick={handlePay} className="bg-blue-500 text-white w-full py-2 rounded-sm mt-8 hover:bg-blue-400">
                    Pay
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {loadingDeliver && <Loader />}
        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
          <div>
            <button
              type="button"
              className="bg-blue-500 text-white w-full py-2"
              onClick={deliverHandler}
            >
              Mark As Delivered
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
