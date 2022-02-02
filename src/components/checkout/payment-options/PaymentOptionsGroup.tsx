import React, { Fragment, useCallback } from "react";
import { KlarnaPaymentControls } from "../klarna/KlarnaPaymentControls";

interface PaymentOptionsGroupProps {}

enum PAYMENT_PROVIDER {
  KLARNA = "klarna",
  PAYPAL = "paypal",
}

export const PaymentOptionsGroup: React.FC<PaymentOptionsGroupProps> = ({}) => {
  const [selectedPaymentProvider, setSelectedPaymentProvider] =
    React.useState<null | PAYMENT_PROVIDER>(null);

  const handlePaymentSelectionChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedPaymentProvider(e.target.value as PAYMENT_PROVIDER);
    },
    []
  );

  return (
    <Fragment>
      {/* radio buttons */}
      <div className="flex flex-col text-sm mt-4 space-y-2">
        <div>
          <input
            checked={selectedPaymentProvider === PAYMENT_PROVIDER.PAYPAL}
            type="radio"
            id="paypal"
            name="paypal"
            value="paypal"
            onChange={(e) => handlePaymentSelectionChange(e)}
          />
          <label htmlFor="paypal" className="font-semibold tracking-wide ml-4">
            PayPal
          </label>
        </div>
        <div>
          <input
            checked={selectedPaymentProvider === PAYMENT_PROVIDER.KLARNA}
            type="radio"
            id="klarna"
            name="klarna"
            value="klarna"
            onChange={(e) => handlePaymentSelectionChange(e)}
          />
          <label htmlFor="klarna" className="font-semibold tracking-wide ml-4">
            Klarna
          </label>
        </div>
      </div>
      {/* TODO: should only be visible as well when there is user data and the user has an address */}
      {selectedPaymentProvider === PAYMENT_PROVIDER.KLARNA && (
        <KlarnaPaymentControls />
      )}
    </Fragment>
  );
};
