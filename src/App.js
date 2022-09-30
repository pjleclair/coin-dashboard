import React from 'react';
import Header from './Components/Header'
import Body from './Components/Body'
import Footer from './Components/Footer'
import Sidebar from './Components/Sidebar'

function App() {
  const [showSideBar, setShowSideBar] = React.useState(false)
  const [rotateSBButton, setRotateSBButton] = React.useState(false)
  const [displayMode, setDisplayMode] = React.useState('vol')
  const [showCoinData, setShowCoinData] = React.useState(false)

  const changeDisplay = (event) => {
    console.log(event.target.id)
    setDisplayMode(event.target.id)
    if (event.target.id !== 'search') {
        setShowSideBar(!showSideBar)
    }
    setRotateSBButton(false)
    setShowCoinData(false)
  }

  return (
    <div className="App">
      <Header 
        showSideBar={showSideBar}
        setShowSideBar={setShowSideBar}
        setRotateSBButton={setRotateSBButton}
        rotateSBButton={rotateSBButton}
      />
      <Sidebar 
        showSideBar={showSideBar}
        changeDisplay={changeDisplay}
      />
      <Body 
        showSideBar={showSideBar}
        setShowSideBar={setShowSideBar}
        setRotateSBButton={setRotateSBButton}
        showCoinData={showCoinData}
        setShowCoinData={setShowCoinData}
        changeDisplay={changeDisplay}
        displayMode={displayMode}
      />
      <Footer />
    </div>
  );
}

export default App;
