export const checkSelectedAddress = () => {
  if (window.ethereum.selectedAddress) {
    return true;
  } else {
    return false;
  }
};
