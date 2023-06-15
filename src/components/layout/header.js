import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="comp-header-01">
      <Link to="/products" className="c-link">
        <h2 className="c-header-link">TURKCELL CASE STUDY - PRODUCTS</h2>
      </Link>
    </div>
  );
};

export default Header;
