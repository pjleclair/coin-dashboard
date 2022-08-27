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
                gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
                justifyContent: 'center',
                alignItems: 'center',
                border: 'solid 1px black'
            }} key={i}>
                <div style={{margin: '.5rem', fontWeight:'bold'}}>{i+1} {coin.id}:</div>
                <div>{coin.symbol}</div>
                <div>{coin.current_price}</div>
                <div>{coin.market_cap}</div>
                <div>{coin.price_change_percentage_24h}%</div>
            </div>
        )
    })

    const topChangesArray = coinList.filter(token => {
        return (
            Math.abs(token.price_change_percentage_24h) > 5.0
        )
    }).map((coin,i) => {
        return(
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
                justifyContent: 'center',
                alignItems: 'center',
                border: 'solid 1px black'
            }} key={coin.symbol}>
                <div style={{margin: '.5rem', fontWeight:'bold'}}>{i+1} {coin.id}:</div>
                <div>{coin.symbol}</div>
                <div>{coin.market_cap}</div>
                <div>{coin.current_price}</div>
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
                gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
                fontWeight: 'bolder'
            }}>
                <h2>Token</h2>
                <h2>Symbol</h2>
                <h2>Market Cap</h2>
                <h2>Price</h2>
                <h2>24h Price Change</h2>
            </div>
            {topChangesArray}
            <h1>Top tokens:</h1>
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr'
            }}>
                <h2>Token</h2>
                <h2>Symbol</h2>
                <h2>Current Price</h2>
                <h2>Market Cap</h2>
                <h2>24h Price Change</h2>
            </div>
            {displayArray}
        </div>
    )
}

export default Body