import { useEffect } from "react";
import { BaseButton } from "./BaseButton";

export const KlarnaPayment = ({ klarnaData, cartData, onAuthorization }) => {
  /*  const klarnaAsyncCallback = () => {
   try{
    Klarna.Payments.init({
      client_token: clientToken,
    });
   } catch(err) {
       console.log(err);
   }
  }; */
  const { client_token, payment_method_categories, session_id } = klarnaData;
  useEffect(() => {
    window.klarnaAsyncCallback = function () {
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
          console.log("Load function called");
          console.debug(res);
        }
      );
    };
    window.klarnaAsyncCallback();
  }, []);

  const klarnaAuthorize = () => {
    Klarna.Payments.authorize(
      {
        payment_method_category: "pay_now",
      },
      {
        ...cartData,
      },
      function (res) {
        onAuthorization(res);
      }
    );
    // TODO: should send this to backend yes :))
  };

  return (
    <div className="p-4 max-w-2xl mx-auto mt-20 min-h-[50rem]">
      <div className=" border border-black border-opacity-20">
        {/* klarna stuff */}
        <div
          className="py-10 px-8"
          style={{
            width: "500px",
            margin: "auto",
          }}
        >
          <img
            src="https://x.klarnacdn.net/payment-method/assets/badges/generic/klarna.svg"
            style={{ width: "200px", margin: "auto" }}
          />
        </div>

        <div
          id="klarna_container"
          style={{ width: "500px", margin: "auto" }}
        ></div>
        <div className="w-[500px] mx-auto pb-8 pt-2">
          <BaseButton
            onClick={() => klarnaAuthorize()}
            className="authorize uppercase w-full"
          >
            Continue
          </BaseButton>
        </div>
      </div>
    </div>
  );
};
