export const emailValidationRegex = new RegExp(
  /^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~\.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$/
);

export const containsLettersRegex = new RegExp(
  /^([\s'\-\.\/:A-Za-z\xC0-\xCB\xCC\xCD\xCF\xCE\xC9\xD1\xD6\xD8\xDA\xDC\xDD\xDE\xDF\xD9\xF9\xEC\xCD\xE0-\xEB\xED\xEE\xEF\xE9\xFF\xF0\xF1\xF3\xF6\xF8\xFA\xFC\xFD\xD5\xF5\xDB\xD0\xFB\xFB\xFE\xD2\xD3\xF2\xD4\xF4\xF3\u0178\u1E9E\u0105\u0104\u0107\u0106\u0119\u0118\u0142\u0141\u0144\u0143\u00f3\u00d3\u015b\u015a\u017a\u0179\u017c\u017b]){1,100}$/
);

export const mobilePhoneNumberRegex = new RegExp(
  /^((((0{2}?)|(\+){1})46)|0)7[\d]{8}$/
);

export const emailRegex = new RegExp(
  /^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~\.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$/
);

export const passwordRegex = new RegExp(
  /^((?=.*[a-zA-ZåäöæøÅÄÖÆØ])(?=.*[0-9]))[\S]{8,20}$/
);

export const addressRegex = new RegExp(/^[a-zA-ZåäöæøÅÄÖÆØ0-9\s]{1,36}$/);

export const swedishPostalCodeRegex = new RegExp(/^[0-9]{3,3}\ ?[0-9]{2,2}$/);
