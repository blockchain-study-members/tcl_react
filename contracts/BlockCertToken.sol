pragma solidity ^0.4.17;

import "openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";

contract BlockCertToken is StandardToken {

    string public name = "BlockCertToken";
    string public symbol = "BCT";
    uint8 public decimals = 10; // decimal : the degree to which this token can be subdivided
    uint public INITIAL_SUPPLY = 1000; // initial supply : the number of tokens created when this contract is deployed

    constructor() public {
        totalSupply_ = INITIAL_SUPPLY;
        balances[msg.sender] = INITIAL_SUPPLY;
    }
}