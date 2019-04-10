import React from "react";

// reactstrap components
import { Container } from "reactstrap";

class PageHeader extends React.Component {
  render() {
    return (
      <div className="page-header header-filter">
        <div className="squares square1" />
        <div className="squares square2" />
        <div className="squares square3" />
        <div className="squares square4" />
        <div className="squares square5" />
        <div className="squares square6" />
        <div className="squares square7" />
        <Container>
          <div className="content-center brand">
            <h1 className="h1-seo">Travis Foundation</h1>
            <h3 className="d-none d-sm-block">
            A global community of change-makers, linguists and community builders who are passionate about bridging language barriers.
            </h3>
          </div>
        </Container>
      </div>
    );
  }
}

export default PageHeader;
