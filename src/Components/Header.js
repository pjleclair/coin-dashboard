import React from 'react';

const Header = () => {
    const styles = {
        color:'lightblue',
        border:'solid black 1px',
        borderRadius:'20px',
        padding: '1rem',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
    }

    return (
        <div style={styles}>
            <h1>Coin Dashboard</h1>
            <div style={{marginLeft:'auto',color:'black'}}>supported by CoinGecko API</div>
        </div>
    )
}

export default Header