import React, { Component } from 'react';
import CustomNavbar from './Navbar';
import './App.css';
import Web3 from 'web3';
import Tether from '../truffle_abis/Tether.json'
import RWD from '../truffle_abis/RWD.json'
import DecentralBank from '../truffle_abis/DecentralBank.json'
import Main from './Main';

class App extends Component {
   async componentDidMount() {
      await this.loadWeb3();
      await this.loadBlockchainData();
   }

   async loadWeb3() {
      if (window.ethereum) {
         window.web3 = new Web3(window.ethereum);
         await window.ethereum.enable();
      }
      else if (window.web3) {
         window.web3 = new Web3(window.web3.currentProvider);
      }
      else {
         window.alert('No ethereum browser detected! You can check out MetaMask!');
      }
   }

   async loadBlockchainData() {
      const web3 = window.web3;
      const accounts = await web3.eth.getAccounts();
      this.setState({ account: accounts[0] });
      const networkId = await web3.eth.net.getId();
      
      // Tether Contract
      const tetherData = Tether.networks[networkId];
      if (tetherData) {
         const tether = new web3.eth.Contract(Tether.abi, tetherData.address);
         this.setState({ tether });
         const tetherBalance = await tether.methods.balanceOf(this.state.account).call();
         this.setState({ tetherBalance: tetherBalance.toString() });
      } else {
         window.alert('Error! Tether contract not deployed on the detected network!');
      }
   
      // RWD Contract
      const rwdData = RWD.networks[networkId];
      if (rwdData) {
         const rwd = new web3.eth.Contract(RWD.abi, rwdData.address);
         this.setState({ rwd });
         const rwdBalance = await rwd.methods.balanceOf(this.state.account).call();
         this.setState({ rwdBalance: rwdBalance.toString() });
         
      } else {
         window.alert('Error! RWD contract not deployed on the detected network!');
      }
   
      // DecentralBank Contract
      const decentralBankData = DecentralBank.networks[networkId];
      if (decentralBankData) {
         const decentralBank = new web3.eth.Contract(DecentralBank.abi, decentralBankData.address);
         this.setState({ decentralBank });
         const stakingBalance = await decentralBank.methods.stakingBalance(this.state.account).call();
         this.setState({ stakingBalance: stakingBalance.toString() });
         
      } else {
         window.alert('Error! DecentralBank contract not deployed on the detected network!');
      }
      this.setState({loading: false})
   }
   

   constructor(props) {
      super(props);
      this.state = {
         account: '0x0',
         tether: {},
         rwd:{},
         decentralBank:{},
         tetherBalance:'0',
         rwdBalance:'0',
         stakingBalance:'0',
         loading: true
      };
   }

   render() {
      return (
         <div>
            <CustomNavbar account={this.state.account} />
            <div className='container-fluid mt-5'>
               <div className='row'>
                  <main role='main' className='col-lg-12 ml-auto mr-auto' style={{maxWidth:'600px',minHeight:'100vm'}}>
                  <div>
                     <Main/>
                  </div>
                  </main>
               </div>


            </div>

         </div>
      );
   }
}

export default App;
