import React from 'react'
import axios from 'axios'

const Body = () => {

    const [coinList, setCoinList] = React.useState([])
    //let displayArray


    // React.useEffect(() => {
    //     displayArray = coinList.map(coin => {
    //         return (<div></div>)
    //     })
    // },[coinList])

    console.log(coinList)

    React.useEffect(() => {
        axios
            .get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=24h%2C7d')
            .then(response => {
                const data = response.data
                setCoinList(data)
            })
        axios
            .get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=2&sparkline=false&price_change_percentage=24h%2C7d')
            .then(response => {
                setCoinList(prevState => prevState.concat(response.data))
            })
        axios
            .get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=3&sparkline=false&price_change_percentage=24h%2C7d')
            .then(response => {
                setCoinList(prevState => prevState.concat(response.data))
            })
        axios
            .get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=4&sparkline=false&price_change_percentage=24h%2C7d')
            .then(response => {
                setCoinList(prevState => prevState.concat(response.data))
            })
    },[])

    const displayArray = coinList.map((coin,i) => {
        return(
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 1fr',
                justifyContent: 'center',
                alignItems: 'center'
            }} key={i}>
                <div style={{margin: '.5rem', fontWeight:'bold'}}>{i+1} {coin.id} ({coin.symbol}):</div>
                <div>current price: {coin.current_price}</div>
                <div>current mcap: {coin.market_cap}</div>
                <div>24hr price change: {coin.price_change_percentage_24h}</div>
            </div>
        )
    })

    const topChangesArray = coinList.filter(token => {
        return (
            Math.abs(token.price_change_percentage_24h) > 5.0
        )
    }).map(coin => {
        return(
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 3fr',
                justifyContent: 'center',
                alignItems: 'center'
            }} key={coin.symbol}>
                <div style={{margin: '.5rem', fontWeight:'bold'}}>{coin.id}:</div>
                <div>{coin.symbol}</div>
                <div>{coin.market_cap}</div>
                <div>{coin.price_change_percentage_24h}%</div>
            </div>
        )
    })

    return (
        <div style={{
            border: 'solid black 1px',
            padding: '1rem'
        }}>
            <h1>Interesting changes:</h1>
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 3fr'
            }}>
                <div>Token</div>
                <div>Symbol</div>
                <div>Market Cap</div>
                <div>24h Change</div>
            </div>
            {topChangesArray}
            <h1>Top tokens:</h1>
            {displayArray}
        </div>
    )
}

export default Body