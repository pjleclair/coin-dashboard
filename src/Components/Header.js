import React from 'react';

const Header = ({showSideBar, setShowSideBar, setRotateSBButton, rotateSBButton}) => {
    const styles = {
        color:'lightblue',
        border:'solid white 1px',
        padding: '.5rem',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
        borderRadius: '5px',
        position: 'sticky',
        top: 0
    }

    const handleClick = (e) => {
        if (rotateSBButton === false) {
            sbButtonStyle = 'sidebar-button-clicked'
            setShowSideBar(true)
            setRotateSBButton(true)
        } else {
            sbButtonStyle = 'sidebar-button'
            setShowSideBar(false)
            setRotateSBButton(false)
        }
    }
    let sbButtonStyle
    if (rotateSBButton === false) {
        sbButtonStyle = 'sidebar-button'
    } else {
        sbButtonStyle = 'sidebar-button-clicked'
    }

    return (
        <nav style={styles}>
            <div id='sidebar' className={sbButtonStyle} onClick={handleClick}
            style={{
                display: 'flex', flexDirection: 'column', gap: '.5rem',
                marginLeft: '.5rem'
            }}>
                <div style={{backgroundColor:'white', width: '2rem', height: '.25rem'}}></div>
                <div style={{backgroundColor:'white', width: '2rem', height: '.25rem'}}></div>
                <div style={{backgroundColor:'white', width: '2rem', height: '.25rem'}}></div>
            </div>
            <h1 style={{marginLeft:'auto', color:'lightblue',
            marginRight: '.5rem'}}>Coin Dashboard</h1>
        </nav>
    )
}

export default Header