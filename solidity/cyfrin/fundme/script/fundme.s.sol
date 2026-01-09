// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {fundMe} from "../src/fundme.sol";
import {helperConfig} from "./helperConfig.s.sol";

contract fundMeScript is Script {
    function run() external returns (fundMe) {

        helperConfig helper=new helperConfig();

        vm.startBroadcast();
        fundMe fundme = new fundMe(helper.activeConfig());
        vm.stopBroadcast();
        return fundme;
    }
}
