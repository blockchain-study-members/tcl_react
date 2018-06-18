import React from 'react'
import ReactDOM from 'react-dom';
import CertificationContract from '../build/contracts/Certification.json'
import getWeb3 from './utils/getWeb3'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'


class Certify extends React.Component {
    constructor(props) {
        super(props)

        this.list = React.createRef();
        this.contractAddr = "0xa4DFC8caba923b3f800644E0Cd2B112Fa64F7BE6";


        this.state = {
            web3: null
        }

        this.list = React.createRef();
        console.log(this.list);

    }

    componentWillMount() {
        // Get network provider and web3 instance.
        // See utils/getWeb3 for more info.

        getWeb3
            .then(results => {
                var web3 = results.web3;
                let addr =web3.eth.defaultAccount = web3.eth.accounts[0];

                const contract = require('truffle-contract')
                const cert = contract(CertificationContract)
                cert.setProvider(web3.currentProvider)
    
            cert.at(this.contractAddr).then(function(instance){
                
                return instance.getCareers.call(addr, {from:addr});
            }).then(function(result){
                console.log(result.toNumber())
            });

                this.setState({
                    web3: web3
                })
            })
            .catch(() => {
                console.log('Error finding web3.')
            })

    }

    makeCertification(e){

        e.preventDefault();

        const contract = require('truffle-contract')
		const cert = contract(CertificationContract)
		cert.setProvider(this.state.web3.currentProvider)

        let _uId = this.uId.value;
        let _period = this.period.value;
        let _rates = this.rates.value;
        let _list = this.list.current;
        let web3 = this.state.web3;

        console.log(_uId);

        let certInstance;
        let certAddr;
        

        // cert.new({
        //     from : '0xa4DFC8caba923b3f800644E0Cd2B112Fa64F7BE6',//web3.eth.accounts[0],
        //     gas: 4712388,
        //     gasPrice: 100000000000
        // }).then(function(instance){
        cert.at(this.contractAddr).then(function(instance){

            console.log(instance.address);
            certAddr = instance.address;
            _list.innerHTML += "<li>"+instance.transactionHash+"</li>"
            let addr = web3.eth.accounts[0]
            
            instance.makeCertification.call(certAddr,_uId, _rates, {from:certAddr}).then(function(result){
                console.log(result);
            })
        }).then(function(result){

            console.log(result.toString());
        }).catch(function(err){
            console.log(err);
        })

        /*
		// Get accounts.
		//this.state.web3.eth.getAccounts((error, accounts) => {
			cert.deployed().then((instance) => {
                certInstance = instance
                
                //JHvar receipt = this.state.web3.eth.getTransactionReceipt(accounts[0]).then(console.log);

				// Stores a given value, 5 by default.
				return certInstance.makeCertification(_uId, _period, _rates, { from: '0xa4DFC8caba923b3f800644E0Cd2B112Fa64F7BE6'})
			// }).then((result) => {
			// 	// Get the value from the contract to prove it worked.
			// 	return simpleStorageInstance.get.call(accounts[0])
			}).then((result) => {
				// Update state with the result.
                //return this.setState({ storageValue: result.c[0] })
                console.log(result);
			})
        //})
        */

    }

    // instantiateContract() {
    //     /*
    //      * SMART CONTRACT EXAMPLE
    //      *
    //      * Normally these functions would be called in the context of a
    //      * state management library, but for convenience I've placed them here.
    //      */

    //     const contract = require('truffle-contract')
    //     const cert = contract(CertificationContract)
    //     cert.setProvider(this.state.web3.currentProvider)

    //     // Declaring this for later so we can chain functions on SimpleStorage.
    //     var certInstance;

    //     // Get accounts.
    //     this.state.web3.eth.getAccounts((error, accounts) => {
    //         cert.deployed().then((instance) => {
    //             certInstance = instance

    //             // Stores a given value, 5 by default.
    //             return certInstance(123, 12, 4.5 , { from: accounts[0] })
    //         }).then((result) => {
    //             // Get the value from the contract to prove it worked.
    //             return alert(result);
    //         });
    //         // }).then((result) => {
    //         //     // Update state with the result.
    //         //     //return this.setState({ storageValue: result.c[0] })
    //         // })
    //     })
    // }

    render() {
        return (
            <div>
                <h2>Certification</h2>
                <form className="pure-form pure-form-aligned" onSubmit={(e)=>this.makeCertification(e)}>
                    <fieldset>
                        <div className="pure-control-group">
                            <label htmlFor="uid">User Id</label>
                            <input id="uid" type="text" placeholder="Username" ref={(input)=>this.uId=input}/>
                            <span className="pure-form-message-inline">This is a required field.</span>
                        </div>

                        <div className="pure-control-group">
                            <label htmlFor="period">Period</label>
                            <input id="period" type="number" placeholder="1.1" ref={(input)=>this.period=input}/>months
                        </div>

                        <div className="pure-control-group">
                            <label htmlFor="rates">Rates</label>
                            <input id="rates" type="number" placeholder="1.1" ref={(input)=>this.rates=input}/>
                        </div>

                        <div className="pure-controls">
                            <label htmlFor="cb" className="pure-checkbox"><input id="cb" type="checkbox" /> I've read the terms and conditions</label>
                            <button type="submit" className="pure-button pure-button-primary">Submit</button>
                        </div>
                    </fieldset>
                </form>
                <ul ref={this.list}>
                </ul>
            </div>
        );
    }
}


export default Certify
