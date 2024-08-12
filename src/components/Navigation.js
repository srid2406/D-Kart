import { ethers } from 'ethers';
import Sidebar from './Sidebar'



const Navigation = ({ account, setAccount }) => {
    const connectHandler = async () => {
        const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
        const account = ethers.utils.getAddress(accounts[0])
        setAccount(account)
    }

    return (
        <nav>
            <div id="outer-container">
                <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
                <div id="page-wrap" className='nav__brand'>
                    <h1><a href="/">D-Kart</a></h1>
                </div>
            </div>

            <input
            type='text'
            className='nav__search' />

            {account ? (
                <button
                type='button'
                className='nav__connect'>
                    {account.slice(0, 6) + '...' + account.slice(38, 42)}
                </button>
            ) : (
                <button
                type='button'
                className='nav__connect'
                onClick={connectHandler}>
                    Connect
                </button>
            )}

            <ul className='nav__links'>
                <li><a href='#Home Appliances'>Home Appliances</a></li>
                <li><a href='#Beauty Products'>Beauty Products</a></li>
                <li><a href='#Clothing & Jewelry'>Clothing & Jewelry</a></li>
                <li><a href='#Electronics & Gadgets'>Electronics & Gadgets</a></li>
                <li><a href='#Toys & Gaming'>Toys & Gaming</a></li>


            </ul>

        </nav>
    );
}

export default Navigation;