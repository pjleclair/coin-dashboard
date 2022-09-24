import React from 'react'
import axios from 'axios'
import info from '../info.svg'
import link from '../link.svg'
import twitter from '../twitter.svg'

const Body = () => {

    const [coinList, setCoinList] = React.useState([])
    const [coinDataOne, setCoinDataOne] = React.useState([])
    const [coinDataTwo, setCoinDataTwo] = React.useState([])
    const [coinDataThree, setCoinDataThree] = React.useState([])
    const [coinDataFour, setCoinDataFour] = React.useState([])
    const [showSlider, setShowSlider] = React.useState(false)
    const [showCoinData, setShowCoinData] = React.useState(false)
    const [selectedCoin, setSelectedCoin] = React.useState('ethereum')
    const [selectedCoinInfo, setSelectedCoinInfo] = React.useState({})
    const [displayMode, setDisplayMode] = React.useState('vol')
    const [ethPrice, setEthPrice] = React.useState(0)
    const [btcPrice, setBtcPrice] = React.useState(0)
    const [globalInfo, setGlobalInfo] = React.useState()
    const [totalDefiMcap, setTotalDefiMcap] = React.useState(0)
    const [totalMcap, setTotalMcap] = React.useState(0)
    const [trending, setTrending] = React.useState([])
    const [coinToSearch, setCoinToSearch] = React.useState('')

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

    React.useEffect(() => {
        axios
            .get(`https://api.coingecko.com/api/v3/global/decentralized_finance_defi`)
            .then (response => {
                console.log(response.data.data)
                setGlobalInfo(response.data.data)
            })
            .catch(error=>console.log(error))
    },[])

    React.useEffect(() => {
        axios
            .get(`https://api.coingecko.com/api/v3/search/trending`)
            .then (response => {
                console.log(response.data.coins)
                setTrending(response.data.coins)
            })
            .catch(error=>console.log(error))
    },[])

    const getCoinData = (event) => {
        console.log(event)
        if (showCoinData === false) {
            setSelectedCoin(event.target.id)
        }
        setShowCoinData(prevState => !prevState)
    }

    React.useEffect (()=>{
        const eth = coinList.find(({id})=>{
            return id === 'ethereum'
        })
        console.log(eth)
        const btc = coinList.find(({id})=>{
            return id === 'bitcoin'
        })
        if (eth !== undefined){
            setEthPrice(eth.current_price)
            setBtcPrice(btc.current_price)
            let sum = 0
            coinList.forEach(token => {
                sum += token.market_cap
            })
            setTotalMcap(sum)
        }
    },[coinList])

    React.useEffect (()=>{
        const sumValues = obj => {
            return Object.values(obj).reduce((a,b)=>(a+b))
        }
        if (globalInfo !== undefined) {
            setTotalDefiMcap(Number(sumValues(globalInfo.defi_market_cap)))
        }
    },[globalInfo])

    React.useEffect(()=>{
        setCoinList(coinDataOne.concat(coinDataTwo).concat(coinDataThree).concat(coinDataFour))
    },[coinDataOne,coinDataTwo,coinDataThree,coinDataFour])

    const displayArray = coinList.map((coin,i) => {
        const changeVal = coin.price_change_percentage_24h
        let styles = {color:'green'}
        if (changeVal < 0) {styles={color:'red'}}
        const imgSrc = coin.image
        let gridItems = <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr .75fr .5fr .5fr .25fr',
            justifyContent: 'center',
            alignItems: 'center',
            border: 'solid 1px white',
            padding:'.5rem'
        }}>
            <div style={{display:'flex', alignItems:'center'}}>
                <div style={{marginLeft:'.5rem',fontWeight:'bold', display: 'flex', alignItems: 'center'}}>{i+1} <img style={{height:'1rem',margin: '0 .5rem 0 .5rem'}} alt='coin logo' src={imgSrc}/></div>
                <div style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
                    <div style={{fontWeight:'bold', display: 'flex', alignItems: 'center'}}>{coin.id}:</div>
                    <div>{coin.symbol}</div>
                </div>
            </div>
            <div>{coin.market_cap.toLocaleString("en-US")}</div>
            <div>{coin.current_price.toLocaleString("en-US")}</div>
            <div style={styles}>{Number(coin.price_change_percentage_24h).toFixed(2)}%</div>
            <img id={coin.id} alt='info'
                style={{
                    backgroundColor:'white', borderRadius:'20px',display:'flex',
                    border:'1px solid white'
                }}
                src={info}
                onClick={(event)=>getCoinData(event)}
            />
        </div>
        if (window.innerWidth < 450) {
            gridItems = <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr .5fr .5fr',
                justifyContent: 'center',
                alignItems: 'center',
                border: 'solid 1px white',
                padding:'.5rem'
            }}>
                <div style={{display:'flex', alignItems:'center'}}>
                    <div style={{marginLeft:'.5rem',fontWeight:'bold', display: 'flex', alignItems: 'center'}}>{i+1} <img style={{height:'1rem',margin: '0 .5rem 0 .5rem'}} alt='coin logo' src={imgSrc}/></div>
                    <div style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
                        <div style={{fontWeight:'bold', display: 'flex', alignItems: 'center'}}>{coin.id}:</div>
                        <div>{coin.symbol}</div>
                    </div>
                </div>
                <div style={styles}>{Number(coin.price_change_percentage_24h).toFixed(2)}%</div>
                <img id={coin.id} alt='info'
                style={{
                    backgroundColor:'white', borderRadius:'20px',display:'flex',
                    border:'1px solid white'
                }}
                src={info}
                onClick={(event)=>getCoinData(event)}
            />
            </div>
        }
        return(
            <div key={i}>{gridItems}</div>
        )
    })

    

    const MarketStats = ({setDisplayMode}) => {
        const [searchTerm, setSearchTerm] = React.useState('')

        const changeDisplay = (event) => {
            console.log(event.target.id)
            setDisplayMode(event.target.id)
        }
        const ethbtc = ethPrice/btcPrice

        const handleSearch = (event) => {
            event.preventDefault()
            console.log(searchTerm)
            setCoinToSearch({searchTerm})
            changeDisplay(event)
        }

        const handleInput = (event) => {
            console.log(event.target.value)
            setSearchTerm(event.target.value)
        }
        return (
            <>
                <h1 className='market-stats' style={{
                    display: 'flex',
                    justifyContent:'center'
                }}>Market Stats</h1>
                <div style={{display:'flex',justifyContent:'center'}}>
                    <div style={{
                        display:'flex',
                        justifyContent:'space-evenly',
                        flexDirection:'column',
                        border: 'solid 1px white',
                        width: 'fit-content',
                        padding:'1rem',
                        borderRadius:'10px'
                    }}>
                        <div style={{color:'lightblue'}}><strong>ETH/BTC:</strong> {ethbtc.toFixed(3)}</div>
                        <div style={{color:'lightblue'}}><strong>Total Crypto Mcap:</strong> {totalMcap.toLocaleString("en-US")}</div>
                        <div style={{color:'lightblue'}}><strong>Total Defi Mcap:</strong> {totalDefiMcap.toLocaleString("en-US")}</div>
                    </div>
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '1rem'
                }}>
                    <div>
                        <h2>Change View:</h2>
                        <div style={{marginBottom:'1rem'}}>
                            <button className='button--view' onClick={(event)=>changeDisplay(event)} id='vol'>Volatility</button>
                            <button className='button--view' onClick={(event)=>changeDisplay(event)} id='mcap'>Market Cap</button>
                            <button className='button--view' onClick={(event)=>changeDisplay(event)} id='trend'>Trending</button>
                        </div>
                    </div>
                    <form>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                            <input style={{
                                width: '100%',
                                color: 'rgb(36, 35, 42)',
                                fontSize: '16px',
                                lineHeight: '20px',
                                minHeight: '28px',
                                borderRadius: '4px',
                                padding: '4px 8px',
                                border: '2px solid transparent',
                                boxShadow: 'rgb(0 0 0 / 12%) 0px 1px 3px, rgb(0 0 0 / 24%) 0px 1px 2px',
                                background: 'rgb(251, 251, 251)',
                                transition: 'all 0.1s ease 0s'
                            }}
                                type={'search'}
                                placeholder={'search coins...'}
                                aria-label='search coins'
                                onInput={handleInput}
                                value={searchTerm}
                                name='searchTerm'
                            />
                            <button className='button--view' id='search' onClick={handleSearch}>Search</button>
                    </div>
                    </form>
                </div>
            </>
        )
    }

    const CoinData = ({coin, getCoinData}) => {
        // const site = coin.links.homepage[0]
        console.log(coin)
        let desc = coin.description.en
        if (desc === '') {desc = 'No description available.'}
        else {desc = `<p>${desc}</p>`}
        let categories = coin.categories.map(category=>{
            return <li key={category}>{category}</li>
        })
        if (categories.length === 0) {categories = <li>No categories available.</li>}
        let marketData = coin.market_data
        let priceChange = marketData.price_change_percentage_24h
        let priceStyle = {color:'green',marginLeft:'.5rem'}
        if (priceChange < 0) {priceStyle = {color:'red', marginLeft:'.5rem'}}
        let fdv = marketData.fully_diluted_valuation.usd
        let fdvStyle = {color:'lightblue', marginLeft:'.5rem'}
        if (fdv === undefined) {
            fdv = 'no data available'
            fdvStyle={color:'grey',marginLeft:'.5rem'}
        }
        let price = marketData.current_price.usd
        let displayData = <div style={{display:'grid',gridTemplateColumns:'1fr 1fr'}}>
            <div>
                <div style={{marginLeft:'1rem'}}>
                    <h3>market data:</h3>
                    <div style={{display:'flex',alignItems:'center'}}><strong>current price:</strong> <div style={{marginLeft:'.5rem',color: priceStyle.color}}>${price.toLocaleString("en-US")}</div></div>
                    <div style={{display:'flex',alignItems:'center'}}><strong>24h price change:</strong> <div style={priceStyle}>{Number(priceChange).toFixed(2)}%</div></div>
                </div>
            </div>
            <div>
                <div>
                    <h3>market cap rank: {coin.market_cap_rank}</h3>
                    <div style={{color:'lightblue'}}><strong>market cap:</strong> {marketData.market_cap.usd.toLocaleString("en-US")}</div>
                    <div style={{display:'flex',alignItems:'center'}}><strong>fully diluted value:</strong> <div style={fdvStyle}>{fdv.toLocaleString("en-US")}</div></div>    
                </div>
            </div>
        </div>
        let categoryStyle = {marginLeft:'1rem'}
        if (window.innerWidth < 450) {
            displayData = <div>
                <h3>market cap rank: {coin.market_cap_rank}</h3>
                <h3>market data:</h3>
                <div style={{marginLeft:'1rem'}}>
                    <div style={{color:'lightblue'}}><strong>market cap:</strong> {marketData.market_cap.usd.toLocaleString("en-US")}</div>
                    <div style={{display:'flex',alignItems:'center'}}><strong>fully diluted value:</strong> <div style={fdvStyle}>{fdv.toLocaleString("en-US")}</div></div>
                    <br />
                    <div style={{display:'flex',alignItems:'center'}}><strong>current price:</strong> <div style={{color:priceStyle.color, marginLeft:'.5rem'}}>${price.toLocaleString("en-US")}</div></div>
                    <div style={{display:'flex',alignItems:'center'}}><strong>24h price change:</strong> <div style={priceStyle}>{priceChange.toFixed(2)}%</div></div>
                </div>
            </div>
            categoryStyle = {marginLeft:''}
        }
        return (
            <>
                <div style={{display: 'flex',margin:'1rem'}}>
                    <button onClick={getCoinData}>Return</button>
                    <div style={{marginLeft: 'auto'}}>
                        <a href={coin.links.homepage[0]}><img alt='link' src={link} style={{height:'2rem', backgroundColor:'white',borderRadius:'10px'}}/></a>
                        <a href={`https://twitter.com/${coin.links.twitter_screen_name}`}><img alt='twitter link' src={twitter} style={{height:'2rem', backgroundColor:'white',borderRadius:'10px'}}/></a>
                    </div>
                </div>
                <div style={{display:'flex'}}>
                    <h1>{coin.name}</h1>
                    <img alt='logo' style={{marginLeft:'auto',height:'5rem'}} src={coin.image.large}/>
                </div>
                <div>
                    <div>{displayData}</div>
                    <div style={categoryStyle}>
                        <h3>categories:</h3>
                        <ul>{categories}</ul>
                    </div>
                </div>
                <div dangerouslySetInnerHTML={{__html: desc}} style={{
                    border:'1px solid white',
                    borderRadius:'10px',
                    padding:'.5rem'
                }}></div>
            </>
        )
    }

    const TopTokens = ({displayArray, getCoinData}) => {
        let columns = <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr .75fr .5fr .5fr .25fr'
        }}>
            <h2>Token</h2>
            <h2>Market Cap</h2>
            <h2>Current Price</h2>
            <h2>24h Price Change</h2>
            <></>
        </div>
        if (window.innerWidth < 450) {
            columns = <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr .5fr .5fr'
            }}>
                <h2>Token</h2>
                <h2>24h Price Change</h2>
                <></>
            </div>
        }
        return (
            <div>
                <h1>Top tokens by MarketCap:</h1>
                {columns}
                {displayArray}
            </div>
        )
    }

    const SearchTokens = ({searchTerm,getCoinData}) => {
        const [searchData, setSearchData] = React.useState({})
        const [coinResults, setCoinResults] = React.useState([])
        const coin = searchTerm.searchTerm
        React.useEffect(()=>{
            axios
            .get(`https://api.coingecko.com/api/v3/search?query=${coin}`)
            .then(response => {
                console.log(response.data)
                setSearchData(response.data)
            })
            .catch(error=>console.log(`Something went wrong:`, error))
        },[coin])
        
        React.useEffect(()=>{
            let results = [<li>no data.</li>]
            if (searchData.coins !== undefined) {
                results = searchData.coins.map(coin=>{
                    return(
                        <li style={{
                            display:'flex',
                            alignItems:'center',
                            margin:'.5rem'
                        }} key={coin.id}>
                            <div style={{marginRight:'.5rem'}}>{coin.market_cap_rank}</div>
                            <img style={{marginRight:'.5rem',width:'1rem'}} src={coin.large} alt='logo'/>
                            
                            {coin.name} ({coin.symbol})
                            <img id={coin.id} alt='info'
                                style={{
                                    backgroundColor:'white', borderRadius:'20px',display:'flex',
                                    border:'1px solid white',marginLeft:'.5rem', width:'1rem'
                                }}
                                src={info}
                                onClick={(event)=>getCoinData(event)}
                                />
                        </li>
                    )
                })
                console.log(searchData)
            }
            setCoinResults(
                results
            )
        },[searchData, getCoinData])

        return (
            <div>
                <h4>You searched:</h4>
                <div>{coin}</div>
                <br />
                <h4>Results:</h4>
                <ul>
                    {coinResults}
                </ul>
            </div>
        )
    }

    const TrendingChanges = ({trending}) => {
        const displayTrending = trending.map(coin => {
            console.log(coin)
            const id = coin.item.id
            console.log(id)
            const trendingCoin = coinList.find(token=>{
                return(
                    id === token.id
                )
            })
            console.log(trendingCoin)
            const img = coin.item.small
            let priceStyle = {
                color:'green'
            }
            if (trendingCoin.price_change_percentage_24h < 0) {priceStyle.color = 'red'}
            return (
                <div style={{
                    display:'grid',
                    gridTemplateColumns:'1fr .5fr .25fr',
                    alignItems:'center'
                }} key={coin.item.id}>
                    <div style={{
                        display:'flex',
                        alignItems:'center',
                        margin:'.5rem'
                    }}>
                        <div style={{marginRight:'.5rem'}}>{coin.item.score + 1}</div>
                        <img alt='logo' src={img} style={{width:'1.5rem'}}/>
                        {coin.item.name}
                    </div>
                    <div style={priceStyle}>{trendingCoin.price_change_percentage_24h.toLocaleString("en-US")}%</div>
                    <img id={trendingCoin.id} alt='info'
                    style={{
                        backgroundColor:'white', borderRadius:'20px',display:'flex',
                        border:'1px solid white'
                    }}
                    src={info}
                    onClick={(event)=>getCoinData(event)}
                    />
                </div>
            )
        })
        return (
            <div>
                <h1>Trending on CoinGecko</h1>
                <div style={{
                    display: 'grid'
                }}>
                    {displayTrending}
                </div>
            </div>
        )
    }

    const TopChanges = ({getCoinData}) => {
        const [filterValue, setFilterValue] = React.useState(10.0)
        const handleClick = (event) => {
            setShowSlider(prevState => !prevState)
        }
        const handleChange = (event) => {
            console.log(event.target.value)
            setFilterValue(event.target.value)
        }

        const topChangesArray = coinList.filter(token => {
            return (
                Math.abs(token.price_change_percentage_24h) > filterValue
            )
        }).map((coin,i) => {
            const changeVal = coin.price_change_percentage_24h
            let styles = {color:'green'}
            if (changeVal < 0) {styles={color:'red'}}
            const imgSrc = coin.image
            let gridItems = <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr .75fr .5fr .5fr .25fr',
                justifyContent: 'center',
                alignItems: 'center',
                border: 'solid 1px white',
                padding:'.5rem'
            }} key={i}>
                <div style={{display:'flex', alignItems:'center'}}>
                    <div style={{marginLeft:'.5rem',fontWeight:'bold', display: 'flex', alignItems: 'center'}}>{i+1} <img style={{height:'1rem',margin: '0 .5rem 0 .5rem'}} alt='coin logo' src={imgSrc}/></div>
                    <div style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
                        <div style={{fontWeight:'bold', display: 'flex', alignItems: 'center'}}>{coin.id}:</div>
                        <div>{coin.symbol}</div>
                    </div>
                </div>
                <div>{coin.market_cap.toLocaleString("en-US")}</div>
                <div>{coin.current_price.toLocaleString("en-US")}</div>
                <div style={styles}>{coin.price_change_percentage_24h.toFixed(2)}%</div>
                <img id={coin.id} alt='info'
                style={{
                    backgroundColor:'white', borderRadius:'20px',display:'flex',
                    border:'1px solid white'
                }}
                src={info}
                onClick={(event)=>getCoinData(event)}
                />
            </div>
            if (window.innerWidth < 450) {
                gridItems = <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr .5fr .25fr',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: 'solid 1px white',
                    padding: '.5rem'
                }} key={i}>
                    <div style={{display:'flex', alignItems:'center'}}>
                        <div style={{marginLeft:'.5rem',fontWeight:'bold', display: 'flex', alignItems: 'center'}}>{i+1} <img style={{height:'1rem',margin: '0 .5rem 0 .5rem'}} alt='coin logo' src={imgSrc}/></div>
                        <div style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
                            <div style={{fontWeight:'bold', display: 'flex', alignItems: 'center'}}>{coin.id}:</div>
                            <div>{coin.symbol}</div>
                        </div>
                    </div>
                    <div style={styles}>{coin.price_change_percentage_24h.toFixed(2)}%</div>
                    <img id={coin.id} alt='info'
                    style={{
                        backgroundColor:'white', borderRadius:'20px',display:'flex',
                        border:'1px solid white'
                    }}
                    src={info}
                    onClick={(event)=>getCoinData(event)}
            />
                </div>
            }
            return(
                <div key={i}>{gridItems}</div>
            )
        })
        let columns = <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr .75fr .5fr .5fr .25fr',
            fontWeight: 'bolder'
        }}>
            <h2>Token</h2>
            <h2>Market Cap</h2>
            <h2>Current Price</h2>
            <h2>24h Price Change</h2>
            <></>
        </div>
        if (window.innerWidth < 450) {
            columns = <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr .5fr .5fr',
                fontWeight: 'bolder'
            }}>
                <h2>Token</h2>
                <h2>24h Price Change</h2>
                <></>
            </div>
        }
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
                    border: '2px solid white',
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
                        <input type={'range'} min='1' max='20' step='1' value={filterValue} name='filterValue' onChange={handleChange}
                        ></input>
                    </div> : 
                    <div></div>
                }
            </div>
            {columns}
            {topChangesArray}
        </div>
        )
    }
    let toDisplay
    if (displayMode === 'vol') {
        toDisplay = <TopChanges
            getCoinData={getCoinData}
        />
    } else if (displayMode === 'trend') {
        toDisplay = <TrendingChanges 
            trending={trending} 
        />
    } else if (displayMode === 'search') {
        toDisplay = <SearchTokens 
            searchTerm = {coinToSearch}
            getCoinData = {getCoinData}
        />
    } else {
        toDisplay = <TopTokens displayArray={displayArray}
            getCoinData={getCoinData}
        />
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
                    setCoinToSearch={setCoinToSearch}
                />
                <div style={{
                    border:'1px solid white',
                    borderRadius:'10px',
                    padding:'.5rem'
                }}>
                    {toDisplay}
                </div>
            </>
            }
        </div>
    )
}

export default Body