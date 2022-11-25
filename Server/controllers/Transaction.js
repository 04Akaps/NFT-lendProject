import { TransactionOwnerList } from "../models/TranscationList.js";

export const getTrnascationList = (req, res) => {
  console.log(req.params);
};

export const transcationTest = async (req, res) => {
  const isDataExisted = await TransactionOwnerList.findOne({
    where: { owner: "0x0x00000" },
  });

  if (isDataExisted == null) {
    // data가 없으니 만들어 주어야 한다.
    try {
      await TransactionOwnerList.create({
        owner: "0x0x00000",
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    // data가 있으니 단순히 transactionList에만 추가해주면 된다.
    console.log("sdfsf");

    await isDataExisted.createTransactionList({
      from: "0x0x00000",
      to: "test",
      text: "testststst",
      owner: "0x0x00000",
    });
  }
};
