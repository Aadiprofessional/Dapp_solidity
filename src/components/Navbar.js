import React, { Component } from 'react';
import { Navbar as BootstrapNavbar } from 'react-bootstrap';
import bank from '../bank.png';

class CustomNavbar extends Component {
   render() {
      return (
         <BootstrapNavbar className='navbar navbar-dark fixed-top shadow p-0' style={{ backgroundColor: 'black', height: '50px' }}>
            <a className='navbar-brand col-sm-3 col-md-2 mr-0'
            style={{ color: 'white' }}> 
            <img src={bank} width={50} height={30} className='d-inline-block align-top' alt='bank image'/>&nbsp; 
            DAPP Yield Staking (Decentralized Banking)
            </a>
            <ul className='navbar-nv ml-auto px-3' style={{ marginRight: '0' }}>
               <li className='text-nowrap nav-item'>
                  <small style={{ color: 'white' }}>Account Number : {this.props.account}</small>
               </li>
            </ul>
         </BootstrapNavbar>
      );
   }
}

export default CustomNavbar;
