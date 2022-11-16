pragma solidity 0.8.0;

abstract contract EventList {

    event MintBuy(address to,uint256 level, string grade );
    event StakingZol(address indexed from, uint256 zolTokenId, uint256 time);
    event UnStakingZol(address indexed from, uint256 zolTokenId, uint256 time);

    event UploadToLend(
        address indexed from,
        uint256 zolTokenId,
        uint256 time,
        uint256 perBlockPrice
    );
    event CancelUpLoadFromLend(
        address indexed from,
        uint256 zolTokenId,
        uint256 time
    );
    event BorrowZolFromLend(
        address indexed from,
        uint256 zolTokenId,
        uint256 time
    );
    event GiveBackZolFromBorrow(
        address indexed from,
        uint256 zolTokenId,
        uint256 time
    );

    event DoExploration(
        address indexed from,
        uint256 zolTokenId,
        uint256 time,
        uint256 duration
    );
    event EndExploration(
        address indexed from,
        uint256 zolTokenId,
        uint256 time,
        uint256 rewardItem
    );

    event LevelUpZol(
        address indexed from,
        uint256 zolTokenId,
        uint256 time,
        uint256 nextLevel
    );
    event GradeUpZol(
        address indexed from,
        uint256 zolTokenId,
        uint256 time,
        string nextGrade
    );

    event WithDrawMiningReward(
        address indexed from,
        uint256 zolTokenId,
        uint256 time,
        uint256 amount
    );
}
