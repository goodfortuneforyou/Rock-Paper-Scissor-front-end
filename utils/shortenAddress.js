export const shortenAddress = (
  address = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  `${address.slice(0, 3)}...${address.slice(address.length - 2)}`;
