import React from 'react';

const Header = () => {
    const styles = {
        color:'lightblue',
        border:'solid white 1px',
        padding: '.5rem',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
        borderRadius: '0 0 10px 10px'
    }

    return (
        <nav style={styles}>
            <h1>Coin Dashboard</h1>
            <div style={{marginLeft:'auto',color:'white'}}>supported by CoinGecko API</div>
        </nav>
    )
}

export default Header