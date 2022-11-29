"use strict";
import { DataTypes, Sequelize } from "sequelize";

export const transcationListSequelize = new Sequelize(
  "TransactionSequelize",
  "root",
  "root",
  {
    define: {
      freezeTableName: true,
    },
    port: "3306",
    dialect: "mysql",
    pool: {
      max: 5,
      mint: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

export const TransactionList = transcationListSequelize.define(
  "TransactionList",
  {
    from: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    to: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
  }
);

// 기존에 index나 보조키를 통해서 DB를 구성할까도 생각을 하였지만
// -> 조회에 이점을 주기 위해서

// index를 구성하면 insert에서 많은 성능저하가 예상이 되기 떄문에 그냥 index는 적용하지 않았고
// 보조키 같은 경우에도 그렇게 좋은 효과를 발휘한다고 생각을 하지 않아서 적용을 하지 않았습니다.

// 그러기 떄문에 insert에서의 성능 저하를 유발하지 않고
// 조회 같은 경우에는 redis를 활용하면 캐시된 데이터를 조회 가능하기 떄문에

// 이러한 방식으로 구조를 구성하였습니다.

export const makeTranscationDB = async (from, to, description) => {
  await TransactionList.create({
    from: from,
    to: to,
    description: description,
  });
};
