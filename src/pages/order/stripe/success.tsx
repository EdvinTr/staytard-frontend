import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment, useEffect, useRef } from "react";
import { CenteredBeatLoader } from "../../../components/global/CenteredBeatLoader";
import { FadeInContainer } from "../../../components/global/FadeInContainer";
import { useCreateCustomerOrderWithStripeMutation } from "../../../lib/graphql";
const OrderSuccessPage: NextPage = () => {
  const router = useRouter();

  const sessionId = router.query.session_id;
  const hasCreatedOrder = useRef(false);
  const [createOrderWithStripe, { loading, error, data }] =
    useCreateCustomerOrderWithStripeMutation({
      notifyOnNetworkStatusChange: true,
    });

  useEffect(() => {
    const createOrder = async () => {
      try {
        // TODO: maybe should have a prop which indicates if the item was created or just fetched. If it was created for the first time, we clear the cart
        const res = await createOrderWithStripe({
          variables: {
            stripeSessionId: sessionId as string,
          },
        });
      } catch (err) {
        console.log(err);
      } finally {
        hasCreatedOrder.current = true;
      }
    };
    createOrder();
  }, [sessionId, createOrderWithStripe]);
  if (loading) {
    return (
      <FadeInContainer className="text-staytard-dark min-h-screen">
        <div className="text-staytard-dark mt-20 space-y-7 text-center">
          <CenteredBeatLoader />
        </div>
      </FadeInContainer>
    );
  }
  if (error) {
    return (
      <FadeInContainer className="text-staytard-dark min-h-screen">
        <div className="text-staytard-dark mt-20 space-y-7 text-center">
          {error && <h1 className="text-lg text-red-600">{error.message}</h1>}
        </div>
      </FadeInContainer>
    );
  }

  return (
    <FadeInContainer className="text-staytard-dark min-h-screen">
      <div className="text-staytard-dark mt-20 space-y-7 text-center">
        {data && (
          <Fragment>
            <h1 className="text-2xl font-bold">Thanks for the order mate!</h1>
            <h2 className="text-xl tracking-wide">You ordered:</h2>
            <ul>
              {data?.createCustomerOrderWithStripe.orderItems.map(
                (item, idx) => {
                  return (
                    <li key={idx} className="flex items-center justify-center">
                      <div className="flex">
                        <Image
                          src={item.product.images[0].imageUrl.replace(
                            "{size}",
                            "200"
                          )}
                          alt={`${item.product.brand.name} - ${item.product.name}`}
                          width={150}
                          height={100}
                          objectFit="contain"
                        />
                        <div>
                          <div>
                            {item.quantity} x {item.product.name}
                          </div>
                          <div>{item.product.brand.name}</div>
                        </div>
                      </div>
                    </li>
                  );
                }
              )}
            </ul>
          </Fragment>
        )}
      </div>
    </FadeInContainer>
  );

  // TODO: need to empty out cart once this is working
};

export default OrderSuccessPage;
