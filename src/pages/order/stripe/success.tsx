import { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { OrderSuccessDisplay } from "../../../components/global/OrderSuccessDisplay";
import CartContext from "../../../contexts/CartContext";
import { useCreateOrGetCustomerOrderWithStripeMutation } from "../../../lib/graphql";
const OrderSuccessPage: NextPage = () => {
  const router = useRouter();
  const sessionId = router.query.session_id;

  const { resetCart } = useContext(CartContext);
  const [createOrderWithStripe, { loading, error, data }] =
    useCreateOrGetCustomerOrderWithStripeMutation({
      notifyOnNetworkStatusChange: true,
    });

  useEffect(() => {
    const createOrder = async () => {
      try {
        const { data } = await createOrderWithStripe({
          variables: {
            stripeSessionId: sessionId as string,
          },
        });
        if (!data || !data.createOrGetCustomerOrderWithStripe) {
          throw new Error();
        }
        if (data.createOrGetCustomerOrderWithStripe.wasCreated) {
          // The order was created with the mutation call and the cart should be reset.
          resetCart();
        }
      } catch (err) {
        console.log(err);
      }
    };
    createOrder();
  }, [sessionId, createOrderWithStripe]);
  if (loading) {
    return <OrderSuccessDisplay loading={loading} />;
  }
  if (error) {
    return <OrderSuccessDisplay error={error} />;
  }
  return data ? (
    <OrderSuccessDisplay
      data={{
        orderNumber: data.createOrGetCustomerOrderWithStripe.order.orderNumber,
        totalAmount: data.createOrGetCustomerOrderWithStripe.order.grandTotal,
        paymentMethod:
          data.createOrGetCustomerOrderWithStripe.order.paymentType,
        purchaseCurrency:
          data.createOrGetCustomerOrderWithStripe.order.purchaseCurrency,
        userEmail: data.createOrGetCustomerOrderWithStripe.user?.email,
      }}
    />
  ) : (
    <></>
  );
};

export default OrderSuccessPage;
