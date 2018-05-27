/**
 * Created by Abhishek Kumar Sinha on 9/8/2017.
 */
import Web3 from 'web3';
import Certification from '../build/contracts/Certification.json';



var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
web3.eth.defaultAccount = web3.eth.accounts[0];
const CERTCONTRACT = web3.eth
                    .contract(Certification.contractAbi)
                    .at(Certification.contractAddress, (err, ctr) => {return ctr})
export { web3, CERTCONTRACT }