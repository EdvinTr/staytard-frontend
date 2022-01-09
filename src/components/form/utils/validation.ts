export const containsLettersRegex = new RegExp(
  /^([\s'\-\.\/:A-Za-z\xC0-\xCB\xCC\xCD\xCF\xCE\xC9\xD1\xD6\xD8\xDA\xDC\xDD\xDE\xDF\xD9\xF9\xEC\xCD\xE0-\xEB\xED\xEE\xEF\xE9\xFF\xF0\xF1\xF3\xF6\xF8\xFA\xFC\xFD\xD5\xF5\xDB\xD0\xFB\xFB\xFE\xD2\xD3\xF2\xD4\xF4\xF3\u0178\u1E9E\u0105\u0104\u0107\u0106\u0119\u0118\u0142\u0141\u0144\u0143\u00f3\u00d3\u015b\u015a\u017a\u0179\u017c\u017b]){1,100}$/
);

/**
 * Check if the input contains letters and numbers
 * Length between 1-36 characters
 *  */
export const isAddressRegex = new RegExp(/^[a-zA-Z0-9\s]{1,36}$/);

/**
 * Check if input contains 5 number 0-9
 *  */
export const isZipCodeRegex = new RegExp(/^[0-9]{3,3}\ ?[0-9]{2,2}$/);

/**
 * Check if input contains:
 * - At least 8 characters
 * - At least one number
 * - At least one letter
 *  */
export const passwordValidationRegex = new RegExp(
  /^((?=.*[a-zA-ZåäöæøÅÄÖÆØ])(?=.*[0-9]))[\S]{8,}$/
);
