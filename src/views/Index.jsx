import React from "react";

// components
import IndexNavbar from "../components/Navbars/IndexNavbar.jsx";
import PageHeader from "../components/PageHeader/PageHeader.jsx";
import Footer from "../components/Footer/Footer.jsx";

// sections for this page/view
import Video from "../views/IndexSections/Video.jsx";
import JavaScript from "../views/IndexSections/JavaScript.jsx";
import NucleoIcons from "../views/IndexSections/NucleoIcons.jsx";
import Signup from "../views/IndexSections/Signup.jsx";


class Index extends React.Component {
  componentDidMount() {
    document.body.classList.toggle("index-page");
  }
  componentWillUnmount() {
    document.body.classList.toggle("index-page");
  }
  render() {
    return (
      <>
        <IndexNavbar />
        <div className="wrapper">
          <PageHeader />
          <div className="main">
            <Video />
            <JavaScript />
            <NucleoIcons />
            <Signup />
          </div>
          <Footer />
        </div>
      </>
    );
  }
}

export default Index;
