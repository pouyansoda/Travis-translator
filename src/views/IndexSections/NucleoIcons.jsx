import React from "react";
// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";

class NucleoIcons extends React.Component {
  render() {
    return (
      <div className="section section-nucleo-icons">
        <img alt="..." className="path" src={require("../../assets/img/path3.png")} />
        <Container>
          <Row className="justify-content-center">
            <Col lg="8" md="12">
              <h2 className="title">The Sentence Society</h2>
              <h4 className="description">
              Travis Foundation is creating a Tigrinya and English machine translation. 
              When you play this game, you're helping bridge language barriers for Tigrinya 
              speakers all over the world.
              To increase the quality of our machine translation, 
              we need at least 1 million more sentences translated. 
              With your help, we can get there soon and help your fellow Tigrinya speakers communicate.
              </h4>
              <div className="btn-wrapper">
                <Button
                  className="btn-round"
                  color="primary"
                  href="#"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Digitising Tigrinya Together
                </Button>
                <Button
                  className="btn-simple btn-round"
                  color="primary"
                  href="#"
                  rel="noopener noreferrer"
                  size="lg"
                  target="_blank"
                >
                  ሓቢርና ንትግርኛ ኣሃዛዊ ንምግባር
                </Button>
              </div>
            </Col>
          </Row>
          <div className="blur-hover">
            <a href="https://www.thesentencesociety.org/index.html" target="_blank" rel="noopener noreferrer">
              <div className="icons-container blur-item on-screen mt-5">
                {/* Center */}
                <i className="icon tim-icons icon-coins" />
                {/* Right 1 */}
                <i className="icon icon-sm tim-icons icon-spaceship" />
                <i className="icon icon-sm tim-icons icon-money-coins" />
                <i className="icon icon-sm tim-icons icon-link-72" />
                {/* Right 2 */}
                <i className="icon tim-icons icon-send" />
                <i className="icon tim-icons icon-mobile" />
                <i className="icon tim-icons icon-wifi" />
                {/* Left 1 */}
                <i className="icon icon-sm tim-icons icon-key-25" />
                <i className="icon icon-sm tim-icons icon-atom" />
                <i className="icon icon-sm tim-icons icon-satisfied" />
                {/* Left 2 */}
                <i className="icon tim-icons icon-gift-2" />
                <i className="icon tim-icons icon-tap-02" />
                <i className="icon tim-icons icon-wallet-43" />
              </div>
              <span className="blur-hidden h5 text-primary">
                Start Playing
              </span>
            </a>
          </div>
        </Container>
      </div>
    );
  }
}

export default NucleoIcons;
