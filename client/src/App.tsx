import "./App.css";
import React, { useState } from "react";
import MainPage from "./components/MainPage";
import Profile from "./components/Profile";

const App: React.FC = () => {
  const [component, setComponent] = useState(true);
  const [searchText, setSearchText] = useState("")

  
  const toggleComponent = () => {
      setComponent(!component);
  };
  return (
    <>
      {component ? (
      <MainPage
      
          toggleComponent={toggleComponent} searchText={searchText} setSearchText={setSearchText}
        />
      ) : (
      <Profile
       
        toggleComponent={toggleComponent} setSearchText={setSearchText}
      />
      )};
    </>
  );
};

export default App;
