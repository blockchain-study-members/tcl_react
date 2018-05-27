import React, { Component } from 'react'

import CertificationContract from '../build/contracts/Certification.json'
import getWeb3 from './utils/getWeb3'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'


class Certify extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            web3: null
        }
    }

    componentWillMount() {
        // Get network provider and web3 instance.
        // See utils/getWeb3 for more info.

        getWeb3
            .then(results => {
                this.setState({
                    web3: results.web3
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

        let certInstance;

        
		// Get accounts.
		this.state.web3.eth.getAccounts((error, accounts) => {
			cert.deployed().then((instance) => {
                certInstance = instance
                
                //JHvar receipt = this.state.web3.eth.getTransactionReceipt(accounts[0]).then(console.log);

				// Stores a given value, 5 by default.
				return certInstance.makeCertification(_uId, _period, _rates, { from: accounts[0] })
			// }).then((result) => {
			// 	// Get the value from the contract to prove it worked.
			// 	return simpleStorageInstance.get.call(accounts[0])
			}).then((result) => {
				// Update state with the result.
                //return this.setState({ storageValue: result.c[0] })
                console.log(result);
			})
		})

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
                <form class="pure-form pure-form-aligned" onSubmit={(e)=>this.makeCertification(e)}>
                    <fieldset>
                        <div class="pure-control-group">
                            <label for="uid">User Id</label>
                            <input id="uid" type="text" placeholder="Username" ref={(input)=>this.uId=input}/>
                            <span class="pure-form-message-inline">This is a required field.</span>
                        </div>

                        <div class="pure-control-group">
                            <label for="period">Period</label>
                            <input id="period" type="number" placeholder="1.1" ref={(input)=>this.period=input}/>months
                        </div>

                        <div class="pure-control-group">
                            <label for="rates">Rates</label>
                            <input id="rates" type="number" placeholder="1.1" ref={(input)=>this.rates=input}/>
                        </div>

                        <div class="pure-controls">
                            <label for="cb" class="pure-checkbox"><input id="cb" type="checkbox" /> I've read the terms and conditions</label>
                            <button type="submit" class="pure-button pure-button-primary">Submit</button>
                        </div>
                    </fieldset>
                </form>
            </div>
        );
    }
}


export default Certify
