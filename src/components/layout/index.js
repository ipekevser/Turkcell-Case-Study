import Header from "./header";
import Footer from "./footer";

const Layout = (props) => {
  return (
    <div className="">
      <main className="main">
        <Header />
        {props.children}
        <Footer />
      </main>
    </div>
  );
};

export default Layout;
