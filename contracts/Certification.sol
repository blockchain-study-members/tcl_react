pragma solidity ^0.4.18;
pragma experimental ABIEncoderV2;

contract Certification {
    address companyAddr;

    //event OnCreateRoom(address indexed _from, uint256 _value);

    struct Career {
        string uId;
        uint256 rates;
    }
    
    Career[] public careers;

    constructor () public {
    }

    function makeCertification(string uId, uint rates) public returns(string){
        Career memory crr = Career(uId, rates);
        careers.push(crr);

        return uId;
    }
    function getCareers() public returns (uint) {
        return careers.length;
    }
    
    //function getRates() public view returns (uint) {
        //return rates;
    //}
}
