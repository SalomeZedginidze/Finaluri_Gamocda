import { useState } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Burgerbar from "./Components/Burgerbar/Burgerbar";
import Main from "./Components/Main/Main";

function App() {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  return (
    <>
      <Header
        isHamburgerOpen={isHamburgerOpen}
        setIsHamburgerOpen={setIsHamburgerOpen}
      />

      {isHamburgerOpen ? (
        <Burgerbar
          isHamburgerOpen={isHamburgerOpen}
          setIsHamburgerOpen={setIsHamburgerOpen}
        />
      ) : (
        <Main isHamburgerOpen={isHamburgerOpen} />
      )}
    </>
  );
}

export default App;
