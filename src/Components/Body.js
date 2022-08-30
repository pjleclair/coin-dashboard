import React from 'react'
import axios from 'axios'

const Body = () => {

    const [coinList, setCoinList] = React.useState([])
    const [coinDataOne, setCoinDataOne] = React.useState([])
    const [coinDataTwo, setCoinDataTwo] = React.useState([])
    const [coinDataThree, setCoinDataThree] = React.useState([])
    const [coinDataFour, setCoinDataFour] = React.useState([])
    const [filterValue, setFilterValue] = React.useState(10.0)
    const [showSlider, setShowSlider] = React.useState(false)
    const [showCoinData, setShowCoinData] = React.useState(false)
    const [selectedCoin, setSelectedCoin] = React.useState('')
    const [selectedCoinInfo, setSelectedCoinInfo] = React.useState({})

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
        axios
            .get(`https://api.coingecko.com/api/v3/coins/${selectedCoin}`)
            .then (response => {
                console.log(response.data)
                setSelectedCoinInfo(response.data)
            })
            .catch(error=>console.log(error))
    },[selectedCoin])

    const getCoinData = (event) => {
        console.log(showCoinData)
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
                gridTemplateColumns: '1fr .5fr 1fr 1fr 1fr .5fr',
                justifyContent: 'center',
                alignItems: 'center',
                border: 'solid 1px black'
            }} key={i}>
                <div style={{margin: '.5rem', fontWeight:'bold', display: 'flex', alignItems: 'center'}}>{i+1} <img style={{height:'1rem',margin: '0 .5rem 0 .5rem'}} alt='coin logo' src={imgSrc}/> {coin.id}:</div>
                <div>{coin.symbol}</div>
                <div>{coin.current_price}</div>
                <div>{coin.market_cap}</div>
                <div style={styles}>{coin.price_change_percentage_24h}%</div>
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
                border: 'solid 1px black'
            }} key={i}>
                <div style={{display:'flex', alignItems:'center'}}>
                    <div style={{marginLeft:'.5rem',fontWeight:'bold', display: 'flex', alignItems: 'center'}}>{i+1} <img style={{height:'1rem',margin: '0 .5rem 0 .5rem'}} alt='coin logo' src={imgSrc}/></div>
                    <div style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
                        <div style={{fontWeight:'bold', display: 'flex', alignItems: 'center'}}>{coin.id}:</div>
                        <div>{coin.symbol}</div>
                    </div>
                </div>
                <div>{coin.market_cap}</div>
                <div>{coin.current_price}</div>
                <div style={styles}>{coin.price_change_percentage_24h}%</div>
                <button id={coin.id} onClick={getCoinData}>More info</button>
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

    const MarketStats = () => {
        return (
            <>
                <h1 style={{
                    display: 'flex',
                    justifyContent:'center'
                }}>Market Stats</h1>
            </>
        )
    }

    const CoinData = ({coin}) => {
        // const site = coin.links.homepage[0]
        console.log(coin)
        // const desc = props.coin.description.en
        return (
            <>
                <div style={{display: 'flex'}}>
                    <button onClick={getCoinData}>Return</button>
                    <a style={{marginLeft: 'auto'}} href={coin.links.homepage[0]}>Website</a>
                </div>
                <h1>{coin.name}</h1>
                <p>{coin.description.en}</p>
            </>
        )
    }

    return (
        <div style={{
            padding: '1rem'
        }}>
            {showCoinData === true ? 
            <CoinData 
                coin={selectedCoinInfo}
            /> :
            <>
                <MarketStats />
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
                            <input type={'range'} min='1' max='20' value={filterValue} name='filterValue' onChange={handleChange}
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
                    <h2>Price</h2>
                    <h2>24h Price Change</h2>
                    <h2>More Info</h2>
                </div>
                {topChangesArray}
                <h1>Top tokens by MarketCap:</h1>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr .5fr 1fr 1fr 1fr .5fr'
                }}>
                    <h2>Token</h2>
                    <h2>Symbol</h2>
                    <h2>Current Price</h2>
                    <h2>Market Cap</h2>
                    <h2>24h Price Change</h2>
                    <h2>More Info</h2>
                </div>
                {displayArray}
            </>
            }
        </div>
    )
}

export default Body