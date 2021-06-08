/**
 * Use regex to verify that the email is a valid email address.
 *
 * @param     email   Email to be checked
 * @returns           Boolean, true if valid, false otherwise
 */
module.exports = (email) => {
  const emailFormat =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return emailFormat.test(email);
};
