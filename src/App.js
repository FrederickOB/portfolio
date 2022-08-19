import { useEffect, useState } from "react";
import ADINKRA_ICONS from "./helper/adinka_icons";
import "./App.css";
import ReactFullpage from "@fullpage/react-fullpage";
// import "fullpage.js/vendors/scrolloverflow";
import Intro from "./Pages/Intro";
import Bio from "./Pages/Bio";
import Contact from "./Pages/Contact";
import Portfolio from "./Pages/Portfolio";

function App() {
  const [number, setNumber] = useState(0);
  useEffect(() => {
    // create interval
    const interval = setInterval(
      // set number every 5s
      () => setNumber(Math.floor(Math.random() * 10)),
      10000
    );

    // clean up interval on unmount
    return () => {
      clearInterval(interval);
    };
  }, []);

  const Menu = () => (
    <div
      className="menu"
      style={{
        position: "fixed",
        top: 0,
        zIndex: 100,
      }}
    ></div>
  );
  return (
    <div
      className="h-screen font-mono bg-fixed"
      style={{
        backgroundImage: `url("${ADINKRA_ICONS[number]}")`,
        backgroundColor: "black",
      }}
    >
      <Menu />
      <ReactFullpage
        // debug /* Debug logging */
        navigation
        // scrollingSpeed={1000} /* Options here */
        anchors={["Home", "Bio", "Portfolio", "Contact"]}
        navigationTooltips={["Home", "Bio", "Portfolio", "Contact"]}
        // scrollOverflow={false}
        sectionsColor={["transparent", "transparent", "transparent"]}
        credits={{ enabled: false }}
        render={(comp) => (
          <ReactFullpage.Wrapper>
            <div className="section">
              <Intro />
            </div>
            <div className="section">
              <Bio />
            </div>
            <div className="section">
              <Portfolio />
            </div>
            <div className="section">
              <Contact />
            </div>
          </ReactFullpage.Wrapper>
        )}
      />
    </div>
  );
}

export default App;
