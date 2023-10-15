export const checkIfStringIsPEM = (str: string) => {
  return (
    str &&
    typeof str === "string" &&
    str.match(/-----BEGIN[^-]+-----([\s\S]+)-----END[^-]+-----/)
  );
};
