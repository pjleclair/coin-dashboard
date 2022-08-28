import React from 'react'
import axios from 'axios'

const Body = () => {

    const [coinList, setCoinList] = React.useState([])
    const [filterValue, setFilterValue] = React.useState(10.0)
    const [showSlider, setShowSlider] = React.useState(false)
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
            .catch(()=>{alert('API retrieval failed')})
        axios
            .get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=2&sparkline=false&price_change_percentage=24h%2C7d')
            .then(response => {
                setCoinList(prevState => prevState.concat(response.data))
            })
            .catch(()=>{alert('API page 2 retrieval failed')})
        axios
            .get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=3&sparkline=false&price_change_percentage=24h%2C7d')
            .then(response => {
                setCoinList(prevState => prevState.concat(response.data))
            })
            .catch(()=>{alert('API page 3 retrieval failed')})
        axios
            .get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=4&sparkline=false&price_change_percentage=24h%2C7d')
            .then(response => {
                setCoinList(prevState => prevState.concat(response.data))
            })
            .catch(()=>{alert('API page 4 retrieval failed')})
    },[])

    const displayArray = coinList.map((coin,i) => {
        const changeVal = coin.price_change_percentage_24h
        let styles = {color:'green'}
        if (changeVal < 0) {styles={color:'red'}}
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
        return(
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
                justifyContent: 'center',
                alignItems: 'center',
                border: 'solid 1px black'
            }} key={coin.id}>
                <div style={{margin: '.5rem', fontWeight:'bold'}}>{i+1} {coin.id}:</div>
                <div>{coin.symbol}</div>
                <div>{coin.market_cap}</div>
                <div>{coin.current_price}</div>
                <div style={styles}>{coin.price_change_percentage_24h}%</div>
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

    return (
        <div style={{
            padding: '1rem'
        }}>
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
                }}>Adjust Value</button>
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