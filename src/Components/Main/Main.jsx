import React, { useState, useEffect } from "react";
import "./Main.css";
import { useParams, Link } from "react-router-dom";

const Main = () => {
  const three = [
    { main: "OVERVIEW" },
    { main: "STRUCTURE" },
    { main: "SURFACE" },
  ];

  const planetNames = [
    { names: "mercury" },
    { names: "venus" },
    { names: "earth" },
    { names: "mars" },
    { names: "jupiter" },
    { names: "saturn" },
    { names: "uranus" },
    { names: "neptune" },
  ];
  const [data, setData] = useState();
  let { information = "mercury" } = useParams();

  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`data.json`);
        console.log(response);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();

        const planetData = result.find(
          (item) => item.name.toLowerCase() === information.toLowerCase()
        );

        if (planetData) {
          setData(planetData);
        } else {
          console.error("Planet data not found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [information]);

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };
  const getDynamicContent = () => {
    if (activeSection === "overview") {
      return (
        <>
          <p className="overview">{data?.overview?.content}</p>
          <p className="source">
            Source:
            <a className="wikipedia" href={data?.overview?.source}>
              Wikipedia{" "}
            </a>
            <span>
              <img className="icon" src="./assets/icon-source.svg" />
            </span>
          </p>
        </>
      );
    } else if (activeSection === "internal") {
      return (
        <>
          <p className="overview">{data?.structure?.content}</p>
          <p className="source">
            Source:
            <a className="wikipedia" href={data?.structure?.source}>
              Wikipedia{" "}
            </a>
            <span>
              <img className="icon" src="./assets/icon-source.svg" />
            </span>
          </p>
        </>
      );
    } else if (activeSection === "surface") {
      return (
        <>
          <p className="overview">{data?.geology?.content}</p>
          <p className="source">
            Source:
            <a className="wikipedia" href={data?.geology?.source}>
              Wikipedia{" "}
            </a>
            <span>
              <img className="icon" src="./assets/icon-source.svg" />
            </span>
          </p>
        </>
      );
    }
  };

  const getPlanetImage = () => {
    if (activeSection === "overview") {
      return [data?.images?.planet];
    } else if (activeSection === "internal") {
      return [data?.images?.internal];
    } else if (activeSection === "surface") {
      return [data?.images?.planet, data?.images?.geology];
    }

    return "";
  };

  return (
    <div className="whole">
      {data ? (
        <div>
          <div className="main">
            {three.map((each, index) => (
              <div
                key={index}
                className={`each each${index + 1}`}
                onClick={() =>
                  each.main.toLowerCase() === "structure"
                    ? setActiveSection("internal")
                    : setActiveSection(each.main.toLowerCase())
                }
              >
                <h2
                  className="mainThree"
                  style={
                    activeSection === each.main.toLowerCase()
                      ? { borderColor: data.backgroundColor }
                      : activeSection === "internal" &&
                        each.main.toLowerCase() === "structure"
                      ? { borderColor: data.backgroundColor }
                      : {}
                  }
                >
                  {each.main}
                </h2>
              </div>
            ))}
          </div>
          <div className="eight">
            {planetNames.map((eachPlanet, index) => (
              <div key={index}>
                <Link className="link" to={`/${eachPlanet.names}`}>
                  <h2
                    className="namesOfPlanets"
                    style={
                      information === eachPlanet.names
                        ? { borderColor: data.backgroundColor }
                        : {}
                    }
                  >
                    {eachPlanet.names}
                  </h2>
                </Link>
              </div>
            ))}
          </div>
          <div className="line second"></div>
          <div className="everything">
            <div className="forFlex">
              <div className="thirdImage">
                <img className={`${information}`} src={getPlanetImage()[0]} />
                {getPlanetImage()[1] ? (
                  <img className="geologyImg" src={data?.images?.geology} />
                ) : null}
              </div>
              <div className="forInfo">
                <div className="easy">
                  <h1 className="name">{data.name}</h1>
                  {getDynamicContent()}
                </div>
                <div>
                  <div className="mobile">
                    <div>
                      <div
                        className={`each ${
                          activeSection === "overview" ? "active" : ""
                        }`}
                        style={
                          activeSection === "overview"
                            ? { backgroundColor: data.backgroundColor }
                            : {}
                        }
                        onClick={() => handleSectionClick("overview")}
                      >
                        <span className="span">01</span>
                        <h2 className="mainThree">overview</h2>
                      </div>
                      <div
                        className={`each ${
                          activeSection === "internal" ? "active" : ""
                        }`}
                        style={
                          activeSection === "internal"
                            ? { backgroundColor: data.backgroundColor }
                            : {}
                        }
                        onClick={() => handleSectionClick("internal")}
                      >
                        <span className="span">02</span>
                        <h2 className="mainThree">Internal Structure</h2>
                      </div>
                      <div
                        className={`each ${
                          activeSection === "surface" ? "active" : ""
                        }`}
                        style={
                          activeSection === "surface"
                            ? { backgroundColor: data.backgroundColor }
                            : {}
                        }
                        onClick={() => handleSectionClick("surface")}
                      >
                        <span className="span">03</span>
                        <h2 className="mainThree">Surface Geology</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="details">
              <div className="same">
                <p className="common-label">Rotation Time</p>
                <span className="common-value rotation-time">
                  {data.rotation}
                </span>
              </div>
              <div className="same">
                <p className="common-label">Revolution Time</p>
                <span className="common-value revolution-time">
                  {data.revolution}
                </span>
              </div>
              <div className="same">
                <p className="common-label">Radius</p>
                <span className="common-value radius">{data.radius}</span>
              </div>
              <div className="same">
                <p className="common-label">Average Temp.</p>
                <span className="common-value average-temp">
                  {data.temperature}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Main;
