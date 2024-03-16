import React, { Component } from 'react';

class Main extends Component {
   render() {
      return (
        <div id='content' className='mt=3'>
          <table className='table text-muted text-center'>
            <thead>
                <tr style={{color:'white'}}>
                    <th scope='col'>Staking Balance </th>
                    <th scope='col'>Reward Balance</th>
                </tr>
            </thead>
            <tbody>
                <tr style={{color:'white'}}>
                    <td>USDT</td>
                    <td>RWD</td>
                </tr>
            </tbody>
          </table>
        </div>
      );
   }
}

export default Main;
