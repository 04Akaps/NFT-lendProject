const connectWalletError = new Error("can't connect Wallet");

export const connectWallet = async () => {
  try {
    if (!window.klaytn) {
      alert("KaiKas를 설치해 주세요 설치 페이지로 이동합니다.");
      window.localStorage.removeItem("auth");
      window.location.replace(
        "https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi"
      );
    }
    await window.klaytn.enable();
  } catch (error) {
    connectWalletError();
  }
};

export const getBalanceToken = async () => {
  console.log("getBalance");
};
