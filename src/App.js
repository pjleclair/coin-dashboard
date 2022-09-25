import React from 'react';
import Header from './Components/Header'
import Body from './Components/Body'
import Footer from './Components/Footer'

function App() {
  const [showSideBar, setShowSideBar] = React.useState(false)
  const [rotateSBButton, setRotateSBButton] = React.useState(false)

  return (
    <div className="App">
      <Header 
        showSideBar={showSideBar}
        setShowSideBar={setShowSideBar}
        setRotateSBButton={setRotateSBButton}
        rotateSBButton={rotateSBButton}
      />
      <Body 
        showSideBar={showSideBar}
        setShowSideBar={setShowSideBar}
        setRotateSBButton={setRotateSBButton}
      />
      <Footer />
    </div>
  );
}

export default App;
