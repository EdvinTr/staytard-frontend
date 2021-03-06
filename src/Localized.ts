export class Localized {
  static readonly page = {
    index: {
      freeShippingText: "Free shipping over 49 EUR & FREE RETURNS",
      deliveryTimeText: "1-3 days delivery",
      rightOfReturnText: "30 days right of return",
    },
    login: {
      loginFailedErrorMessage:
        "Login failed, make sure you entered the correct email and password.",
      passwordInputErrorMessage: "Enter your password to log in.",
      emailInputErrorMessage:
        "Please enter a correct e-mail address (ex.name@example.com).",
    },
    register: {
      inputContainsNumberErrorMessage: "Use only letters. Max 100 characters.",
      firstNameFieldErrorMessage: "Enter first name",
      addressFieldErrorMessage: "Enter address",
      addressValidationErrorMessage:
        "Use only letters and numbers. Max 36 characters.",
      zipCodeValidationErrorMessage:
        "Enter a postcode with 5 digits (ex. 44233).",
      cityInputValidationErrorMessage: "Please enter your location.",
      phoneNumberValidationErrorMessage:
        "Please enter a valid mobile number (ex. 0707123123).",
      emailInputErrorMessage:
        "Please enter a correct e-mail address (ex.name@example.com).",
      passwordInputErrorMessage:
        "Use at least 8 characters with both letters and numbers.",
      registrationFailedErrorMessage: "Registration failed, please try again.",
    },

    checkout: {
      updateUserAddressErrorMessage:
        "Your address could not be updated. Please try again.",
    },
    myProfile: {
      oldPasswordErrorMessage: "Enter your old password.",
      newPasswordErrorMessage:
        "Use at least 8 characters with both letters and numbers.",
      confirmPasswordErrorMessage: "Your passwords are different. Try again.",
      updatePasswordSuccessMessage: "Your password has been updated.",
    },
    product: {
      createProductReviewSuccessMessage:
        "Your review has successfully been created. Please allow up to 48 hours for it to be approved.",
    },
    admin: {
      createProductSuccessMessage: "Product has been created.",
      updateProductSuccessMessage: "Product has been updated.",
      updateProductReviewSuccessMessage: "Review has been updated.",
      updateUserSuccessMessage: "User has been updated.",
      updateCustomerOrderSuccessMessage: "Order has been updated.",
    },
  };
}
