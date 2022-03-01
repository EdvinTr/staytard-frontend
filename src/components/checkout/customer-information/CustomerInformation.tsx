import { MeQuery } from "../../../lib/graphql";

interface CustomerInformationProps {
  customerData: MeQuery["me"];
}

export const CustomerInformation = ({
  customerData,
}: CustomerInformationProps) => {
  /**
   * Obfuscates string with "*" signs.
   * @param str string to obfuscate
   * @param obfuscationLength number of obfuscation signs
   *  */
  const obfuscateField = (str: string, obfuscationLength: number) => {
    return `${str.substring(0, str.length - obfuscationLength)} ${"*".repeat(
      obfuscationLength
    )}`;
  };

  const { email, firstName, lastName, mobilePhoneNumber, address } =
    customerData;
  return (
    <div className="lg:pl-10">
      <div className="text-lg">
        {/* name */}
        <span>{`${obfuscateField(firstName, firstName.length - 2)} `}</span>
        <span>{`${obfuscateField(lastName, lastName.length - 2)} `}</span>
      </div>
      {/* address */}
      <div className="text-13 leading-6 text-[#686a6d]">
        {address && (
          <div>
            <span> {address.street}</span>
            <span> {`${obfuscateField(address.postalCode, 3)}`}</span>
            <span>
              {" "}
              {obfuscateField(address.city, address.city.length - 1)}
            </span>
          </div>
        )}
        {/* email and phone */}
        <div>
          <span>{email}</span> <span>{mobilePhoneNumber}</span>
        </div>
      </div>
    </div>
  );
};
