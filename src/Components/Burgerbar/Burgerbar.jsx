import "./Burgerbar.css";
import { useNavigate } from "react-router-dom";
const Burgerbar = (props) => {
  const bars = [
    { heading: "mercury" },
    { heading: "venus" },
    { heading: "earth" },
    { heading: "mars" },
    { heading: "jupiter" },
    { heading: "saturn" },
    { heading: "uranus" },
    { heading: "neptune" },
  ];

  const tierStyles = [
    { backgroundColor: "#DEF4FC" },
    { backgroundColor: "#F7CC7F" },
    { backgroundColor: "#545BFE" },
    { backgroundColor: "#FF6A45" },
    { backgroundColor: "#ECAD7A" },
    { backgroundColor: "#FCCB6B" },
    { backgroundColor: "#65F0D5" },
    { backgroundColor: "#497EFA" },
  ];
  const navigate = useNavigate();
  return (
    <div className="bar-container">
      {bars.map((bar, index) => (
        <div key={index} className={`bar bar${index + 1}`}>
          <div className="bar-content">
            <div className="eightPlanet">
              <div
                className={`circle tier-${index + 1}`}
                style={tierStyles[index]}
              ></div>
              <div
                onClick={() => {
                  props.setIsHamburgerOpen(false);
                  navigate(`/${bar.heading}`);
                }}
              >
                <h3 className="planets">{bar.heading}</h3>
              </div>
            </div>
            <img className="arrow" src="./assets/icon-chevron.svg" />
          </div>
          <hr className={`lines tier-${index + 1}`} />
        </div>
      ))}
    </div>
  );
};

export default Burgerbar;
