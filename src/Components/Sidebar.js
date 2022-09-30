const Sidebar = ({showSideBar, changeDisplay}) => {

    let sideBarStyle
    const sideBarContent = 
    <div style={{
        padding: '1rem'
    }}>
        <h2>Change View:</h2>
        <div style={{
            marginBottom:'1rem',
            display: 'grid'
        }}>
            <button className='button--view' onClick={changeDisplay} id='vol'>Volatility</button>
            <button className='button--view' onClick={changeDisplay} id='mcap'>Market Cap</button>
            <button className='button--view' onClick={changeDisplay} id='trend'>Trending</button>
        </div>
    </div>
    if (showSideBar === true) {
        sideBarStyle = 'sidebar-open'
    }
    else {
        sideBarStyle = 'sidebar'
    }
    return (
        <div className={sideBarStyle}>
            {sideBarContent}
        </div>
    )
}

export default Sidebar