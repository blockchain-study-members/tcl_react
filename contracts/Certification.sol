pragma solidity ^0.4.18;

contract Certification {
    address companyAddr;
    string uId;
    uint period; // period 
    uint rates;
    
    constructor () public {
        companyAddr = msg.sender;
    }

    function makeCertification(string u, uint p, uint r) public view returns(string){
        uId = u; 
        period = p;
        rates = r;

        return uId;
    }
    
    function getPeriod() public view returns (uint) {
        return period;
    }
    
    function getRates() public view returns (uint) {
        return rates;
    }
}
