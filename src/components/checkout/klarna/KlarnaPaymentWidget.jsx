import Image from "next/image";
import { useEffect } from "react";
import { BaseButton } from "../../global/BaseButton";

export const KlarnaPaymentWidget = ({
  klarnaSessionData,
  cartData,
  onAuthorization,
  error,
}) => {
  const { client_token, payment_method_categories, session_id } =
    klarnaSessionData;
  useEffect(() => {
    const initKlarnaPayment = () => {
      Klarna.Payments.init({
        client_token: client_token,
      });
      console.log("Payments initialized");

      Klarna.Payments.load(
        {
          container: "#klarna_container",
          payment_method_category: "pay_now",
        },

        function (res) {
          // TODO: can remove this whenever
          console.log("Load function called");
          console.debug(res);
        }
      );
    };
    initKlarnaPayment();
  }, [client_token]);

  const onKlarnaContinueClick = async () => {
    Klarna.Payments.authorize(
      {
        payment_method_category: "pay_now",
      },
      {
        ...cartData,
      },
      async function (res) {
        await onAuthorization(res);
      }
    );
  };

  return (
    <div className="mx-auto min-h-[50rem] max-w-2xl p-4">
      <div className=" border border-black border-opacity-20">
        {/* klarna stuff */}
        <div
          className="py-10 px-8"
          style={{
            width: "500px",
            margin: "auto",
          }}
        >
          <Image
            src="https://x.klarnacdn.net/payment-method/assets/badges/generic/klarna.svg"
            className="m-auto "
            width={200}
            alt="Klarna logo"
            height={200}
          />
        </div>

        <div
          id="klarna_container"
          style={{ width: "500px", margin: "auto" }}
        ></div>

        <div className="mx-auto w-[500px] pb-8 pt-2">
          {error && (
            <p className="pt-4 text-sm text-red-500">
              Something went wrong while creating the order. Please try again.
            </p>
          )}
          <BaseButton
            onClick={() => onKlarnaContinueClick()}
            className="authorize w-full uppercase"
          >
            Continue
          </BaseButton>
        </div>
      </div>
    </div>
  );
};
