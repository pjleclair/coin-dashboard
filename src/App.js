import React from 'react';
import Header from './Components/Header'
import Body from './Components/Body'
import Footer from './Components/Footer'

function App() {
  const [showSideBar, setShowSideBar] = React.useState(false)

  return (
    <div className="App">
      <Header 
        showSideBar={showSideBar}
        setShowSideBar={setShowSideBar}
      />
      <Body 
        showSideBar={showSideBar}
        setShowSideBar={setShowSideBar}
      />
      <Footer />
    </div>
  );
}

export default App;
