import React from 'react'
import axios from 'axios'
import info from '../info.svg'
import link from '../link.svg'

const Body = () => {

    const [coinList, setCoinList] = React.useState([])
    const [coinDataOne, setCoinDataOne] = React.useState([])
    const [coinDataTwo, setCoinDataTwo] = React.useState([])
    const [coinDataThree, setCoinDataThree] = React.useState([])
    const [coinDataFour, setCoinDataFour] = React.useState([])
    const [filterValue, setFilterValue] = React.useState(10.0)
    const [showSlider, setShowSlider] = React.useState(false)
    const [showCoinData, setShowCoinData] = React.useState(false)
    const [selectedCoin, setSelectedCoin] = React.useState('ethereum')
    const [selectedCoinInfo, setSelectedCoinInfo] = React.useState({})
    const [displayMode, setDisplayMode] = React.useState('vol')

    console.log(coinList)

    React.useEffect(() => {
        axios
            .get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=24h%2C7d')
            .then(response => {
                const data = response.data
                setCoinDataOne(data)
            })
            .catch(error=>{console.log('API retrieval failed')})
        axios
            .get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=2&sparkline=false&price_change_percentage=24h%2C7d')
            .then(response => {
                const data = response.data
                setCoinDataTwo(data)
            })
            .catch(error=>{console.log('API page 2 retrieval failed')})
        axios
            .get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=3&sparkline=false&price_change_percentage=24h%2C7d')
            .then(response => {
                const data = response.data
                setCoinDataThree(data)
            })
            .catch(error=>{console.log('API page 3 retrieval failed')})
        axios
            .get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=4&sparkline=false&price_change_percentage=24h%2C7d')
            .then(response => {
                const data = response.data
                setCoinDataFour(data)
            })
            .catch(error=>{console.log('API page 4 retrieval failed')})
    },[])

    React.useEffect(() => {
        if (selectedCoin !== '') {
        axios
            .get(`https://api.coingecko.com/api/v3/coins/${selectedCoin}`)
            .then (response => {
                console.log(response.data)
                setSelectedCoinInfo(response.data)
            })
            .catch(error=>console.log(error))}
    },[selectedCoin])

    const getCoinData = (event) => {
        console.log(event)
        if (showCoinData === false) {
            setSelectedCoin(event.target.id)
        }
        setShowCoinData(prevState => !prevState)
    }

    React.useEffect(()=>{
        setCoinList(coinDataOne.concat(coinDataTwo).concat(coinDataThree).concat(coinDataFour))
    },[coinDataOne,coinDataTwo,coinDataThree,coinDataFour])

    const displayArray = coinList.map((coin,i) => {
        const changeVal = coin.price_change_percentage_24h
        let styles = {color:'green'}
        if (changeVal < 0) {styles={color:'red'}}
        const imgSrc = coin.image
        return(
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 1fr .5fr',
                justifyContent: 'center',
                alignItems: 'center',
                border: 'solid 1px white'
            }} key={i}>
                <div style={{display:'flex', alignItems:'center'}}>
                    <div style={{marginLeft:'.5rem',fontWeight:'bold', display: 'flex', alignItems: 'center'}}>{i+1} <img style={{height:'1rem',margin: '0 .5rem 0 .5rem'}} alt='coin logo' src={imgSrc}/></div>
                    <div style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
                        <div style={{fontWeight:'bold', display: 'flex', alignItems: 'center'}}>{coin.id}:</div>
                        <div>{coin.symbol}</div>
                    </div>
                </div>
                <div>{coin.market_cap.toLocaleString("en-US")}</div>
                <div>{coin.current_price}</div>
                <div style={styles}>{Number(coin.price_change_percentage_24h).toFixed(1)}%</div>
                <button id={coin.id} onClick={(event)=>getCoinData(event)} style={{
                        margin:'.3rem',
                        width:'2rem', 
                        display: 'inline-block',
                        outline: '0',
                        border: '0',
                        cursor: 'pointer',
                        backgroundColor: 'lightblue',
                        borderRadius: '20px',
                        padding: '2px 4px',
                        fontSize: '16px',
                        fontWeight: '700',
                        color: 'white',
                        lineHeight: '26px'
                    }}><img id={coin.id} alt='info' style={{backgroundColor:'white', borderRadius:'20px',display:'flex'}} src={info} /></button>
            </div>
        )
    })

    const topChangesArray = coinList.filter(token => {
        return (
            Math.abs(token.price_change_percentage_24h) > filterValue
        )
    }).map((coin,i) => {
        const changeVal = coin.price_change_percentage_24h
        let styles = {color:'green'}
        if (changeVal < 0) {styles={color:'red'}}
        const imgSrc = coin.image
        return(
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 1fr .5fr',
                justifyContent: 'center',
                alignItems: 'center',
                border: 'solid 1px white'
            }} key={i}>
                <div style={{display:'flex', alignItems:'center'}}>
                    <div style={{marginLeft:'.5rem',fontWeight:'bold', display: 'flex', alignItems: 'center'}}>{i+1} <img style={{height:'1rem',margin: '0 .5rem 0 .5rem'}} alt='coin logo' src={imgSrc}/></div>
                    <div style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
                        <div style={{fontWeight:'bold', display: 'flex', alignItems: 'center'}}>{coin.id}:</div>
                        <div>{coin.symbol}</div>
                    </div>
                </div>
                <div>{coin.market_cap.toLocaleString("en-US")}</div>
                <div>{coin.current_price}</div>
                <div style={styles}>{coin.price_change_percentage_24h.toFixed(1)}%</div>
                <button id={coin.id} onClick={(event)=>getCoinData(event)} style={{
                        margin:'.3rem', 
                        width:'2rem',
                        display: 'inline-block',
                        outline: '0',
                        border: '0',
                        cursor: 'pointer',
                        backgroundColor: 'lightblue',
                        borderRadius: '20px',
                        padding: '2px 4px',
                        fontSize: '16px',
                        fontWeight: '700',
                        color: 'white',
                        lineHeight: '26px'
                    }}><img id={coin.id} alt='info' style={{backgroundColor:'white', borderRadius:'20px',display:'flex'}} src={info} /></button>
            </div>
        )
    })

    const handleClick = (event) => {
        setShowSlider(prevState => !prevState)
    }

    const handleChange = (event) => {
        console.log(event.target.value)
        setFilterValue(event.target.value)
    }

    const MarketStats = ({setDisplayMode}) => {
        const changeDisplay = (event) => {
            console.log(event.target)
            setDisplayMode(event.target.id)
        }
        return (
            <>
                <h1 style={{
                    display: 'flex',
                    justifyContent:'center'
                }}>Market Stats</h1>
                <div>Change View:</div>
                <div>
                    <button onClick={(event)=>changeDisplay(event)} id='vol'>Volatility</button>
                    <button onClick={(event)=>changeDisplay(event)} id='mcap'>Market Cap</button>
                </div>
            </>
        )
    }

    const CoinData = ({coin, getCoinData}) => {
        // const site = coin.links.homepage[0]
        console.log(coin)
        let desc = coin.description.en
        if (desc === '') {desc = 'No description available.'}
        return (
            <>
                <div style={{display: 'flex',margin:'1rem'}}>
                    <button onClick={getCoinData}>Return</button>
                    <a style={{marginLeft: 'auto'}} href={coin.links.homepage[0]}><img alt='link' src={link} style={{height:'2rem', backgroundColor:'white',borderRadius:'10px'}}/></a>
                </div>
                <div style={{display:'flex'}}>
                    <h1>{coin.name}</h1>
                    <img alt='logo' style={{marginLeft:'auto',height:'5rem'}} src={coin.image.large}/>
                </div>
                <p>{desc}</p>
            </>
        )
    }

    const TopTokens = ({displayArray, getCoinData}) => {
        return (
            <>
                <h1>Top tokens by MarketCap:</h1>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr 1fr .5fr'
                }}>
                    <h2>Token</h2>
                    <h2>Market Cap</h2>
                    <h2>Current Price</h2>
                    <h2>24h Price Change</h2>
                    <></>
                </div>
                {displayArray}
            </>
        )
    }

    const TopChanges = ({filterValue, topChangesArray, handleChange, handleClick, getCoinData}) => {
        return (
        <div>
            <h1>Tokens with 24h price change &gt;{filterValue}%:</h1>
            <div style={{
                display: 'flex',
                alignItems: 'center'
            }}>
                <button onClick={handleClick} style={{
                    marginRight:'1rem', 
                    display: 'inline-block',
                    outline: '0',
                    border: '0',
                    cursor: 'pointer',
                    backgroundColor: 'lightblue',
                    borderRadius: '50px',
                    padding: '8px 16px',
                    fontSize: '16px',
                    fontWeight: '700',
                    color: 'white',
                    lineHeight: '26px'
                }}>Adjust Filter</button>
                {showSlider === true ? 
                    <div>
                        <input type={'range'} min='1' max='20' value={filterValue} name='filterValue' onChange={(event) => handleChange(event)}
                        ></input>
                    </div> : 
                    <div></div>
                }
            </div>
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 1fr .5fr',
                fontWeight: 'bolder'
            }}>
                <h2>Token</h2>
                <h2>Market Cap</h2>
                <h2>Current Price</h2>
                <h2>24h Price Change</h2>
                <></>
            </div>
            {topChangesArray}
        </div>
        )
    }

    return (
        <div style={{
            padding: '1rem'
        }}>
            {showCoinData === true ? 
            <CoinData 
                coin={selectedCoinInfo}
                getCoinData={getCoinData}
            /> :
            <>
                <MarketStats
                    displayMode={displayMode}
                    setDisplayMode={setDisplayMode} 
                />
                <div style={{
                    border:'1px solid white',
                    borderRadius:'10px',
                    padding:'.5rem'
                }}>
                    {displayMode === 'vol' ?
                    <TopChanges filterValue={filterValue}
                        topChangesArray={topChangesArray}
                        handleChange={handleChange}
                        handleClick={handleClick}
                    /> :
                    <TopTokens displayArray={displayArray}
                        getCoinData={getCoinData}
                    />}
                </div>
            </>
            }
        </div>
    )
}

export default Body