import { useEffect } from "react";
import { BaseButton } from "./BaseButton";

export const KlarnaPayment = ({ clientToken }) => {
  /*  const klarnaAsyncCallback = () => {
   try{
    Klarna.Payments.init({
      client_token: clientToken,
    });
   } catch(err) {
       console.log(err);
   }
  }; */

  useEffect(() => {
    window.klarnaAsyncCallback = function () {
      Klarna.Payments.init({
        client_token: clientToken,
      });
      console.log("Payments initialized");

      Klarna.Payments.load(
        {
          container: "#klarna_container",
          payment_method_category: "pay_over_time",
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
        payment_method_category: "pay_over_time",
      },
      {
        purchase_country: "US",
        purchase_currency: "USD",
        locale: "en-US",
        order_amount: 20000,
        order_tax_amount: 0,
        order_lines: [
          {
            name: "black T-Shirt",
            quantity: 2,
            unit_price: 5000,
            tax_rate: 0,
            total_amount: 10000,
            total_discount_amount: 0,
            total_tax_amount: 0,
            product_url: "https://www.estore.com/products/f2a8d7e34",
            image_url: "https://www.estore.com/product_image.png",
          },
          {
            name: "red trousers",
            quantity: 1,
            unit_price: 10000,
            tax_rate: 0,
            total_amount: 10000,
            total_discount_amount: 0,
            total_tax_amount: 0,
            product_url: "https://www.estore.com/products/f2a8d7e34",
            image_url: "https://www.estore.com/product_image.png",
          },
        ],
        billing_address: {
          given_name: "Jane",
          family_name: "Doe",
          email: "jane@doe.com",
          title: "Ms",
          street_address: "512 City Park Ave",
          postal_code: "43215",
          city: "Columbus",
          region: "oh",
          phone: "6142607295",
          country: "US",
        },
      },
      function (res) {
        console.log("Response from the authorize call:");
        console.log(res);
      }
    );
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
