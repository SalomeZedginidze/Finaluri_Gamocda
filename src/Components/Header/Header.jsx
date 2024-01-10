import "./Header.css";

const Header = (props) => {
  const toggleHamburger = () => {
    props.setIsHamburgerOpen((prev) => !prev);
  };

  return (
    <div>
      <div className="head">
        <h1 className="header">THE PLANETS</h1>
        <img
          className="hamburger"
          src="./assets/icon-hamburger.svg"
          onClick={toggleHamburger}
        />
      </div>
      <div className="line first"></div>
    </div>
  );
};

export default Header;
