// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Test} from "forge-std/Test.sol";
import {console} from "forge-std/Console.sol";
import {fundMeScript} from "../script/fundme.s.sol";
import {fundMe} from "../src/fundme.sol";
contract FundmeTest is Test {
    fundMe fundContract;

    address immutable USER = makeAddr("USER");
    uint256 constant AMOUNT = 6e18;
    uint256 constant MINIMUM_AMOUNT = 5e18;

    function setUp() external {
        fundContract = new fundMeScript().run();
        vm.deal(USER, 10 ether);
    }

    function testMinimumDollarisFive() public view {
        assert(fundContract.MINIMUM_USD() == MINIMUM_AMOUNT);
    }
    function testOwnerIsMsgSender() public view {
        assertEq(fundContract.getOwner(), msg.sender);
    }
    function testPriceFeedIsAccurate() public view {
        uint256 version = fundContract.getVersion();
        assertEq(version, 4);
    }

    function testFundMeFails() public {
        vm.expectRevert();
        fundContract.fund();
    }
    function testFundMe() public {
        hoax(address(1));
        fundContract.fund{value: AMOUNT}();
        // console.log(address(fundContract).balance);
        assert(address(fundContract).balance == AMOUNT);
        assert(fundContract.getAddressToAmountFunded((address(1))) == AMOUNT);
    }

    function testAddFunderToArrayOfFunders() public {
        uint160 totalUser = 10;
        for (uint160 currentUser = 1; currentUser <= totalUser; currentUser++) {
            hoax(address(currentUser));
            fundContract.fund{value: AMOUNT}();
        }

        assert(address(fundContract).balance == 10 * AMOUNT);
    }

    function testWithdrawFail() public {
        fundContract.fund{value: AMOUNT}();

        vm.prank(USER);
        vm.expectRevert();
        fundContract.withdraw();
    }
    function testWithdrawPass() public {
        uint256 startingOwnerBalance = fundContract.getOwner().balance;
        uint256 startingFundmeBalance = address(fundContract).balance;
        vm.prank(USER);
        fundContract.fund{value: AMOUNT}();
        vm.prank(msg.sender);
        fundContract.withdraw();

        uint256 endingOwnerBalance = fundContract.getOwner().balance;
        uint256 endingFundmeBalance = address(fundContract).balance;
        assert(endingOwnerBalance - startingOwnerBalance == AMOUNT);
        assert(startingFundmeBalance == endingFundmeBalance);
    }
}
