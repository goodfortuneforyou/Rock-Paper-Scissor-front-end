export const shortenAddress = (address) => {
  if (address === undefined) {
    return; // or return some default value or an empty string
  }

  // eslint-disable-next-line implicit-arrow-linebreak
  return `${address.slice(0, 3)}...${address.slice(address.length - 2)}`;
};
