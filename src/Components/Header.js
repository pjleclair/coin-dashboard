import React from 'react';

const Header = () => {
    const styles = {
        color:'lightblue',
        border:'solid black 1px',
        padding: '1rem',
        display: 'flex',
        alignItems: 'center'
    }

    return (
        <div style={styles}>
            <h1>Coin Dashboard</h1>
            <div style={{marginLeft:'auto',color:'black'}}>supported by CoinGecko API</div>
        </div>
    )
}

export default Header