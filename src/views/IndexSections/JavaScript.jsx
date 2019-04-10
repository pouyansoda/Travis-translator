import React from "react";


// reactstrap components
import {
  Button,
  Container,
  Row,
  Col,
  Modal,
  UncontrolledCarousel
} from "reactstrap";

const carouselItems = [
  {
    src: require("../../assets/img/denys.jpg"),
    altText: "Slide 1",
    caption: ""
  },
  {
    src: require("../../assets/img/fabien-bazanegue.jpg"),
    altText: "Slide 2",
    caption: ""
  },
  {
    src: require("../../assets/img/mark-finn.jpg"),
    altText: "Slide 3",
    caption: ""
  }
];

class JavaScript extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      demoModal: false,
      miniModal: false,
      formModal: false
    };
  }
  toggleModal = modalState => {
    this.setState({
      [modalState]: !this.state[modalState]
    });
  };
  render() {
    return (
      <div className="section section-javascript" id="javascriptComponents">
        
        <Container>
          <h3 className="title mb-5">Our Story</h3>
          <Row id="modals">
            <Col md="4">
            <img alt="Mission" className="path2" src={require("../../assets/img/mission.jpg")}/><br/><br/>
              <Button
                color="primary"
                onClick={() => this.toggleModal("demoModal")}
              >
                Our Mission
              </Button>
            </Col>
            <Col md="4">
            <img alt="Mission" className="path2" src={require("../../assets/img/vission.jpg")}/><br/><br/>
              <Button
                color="warning"
                onClick={() => this.toggleModal("demoModal")}
              >
                Our Vision
              </Button>
            </Col>
            <Col md="4">
            <img alt="Mission" className="path2" src={require("../../assets/img/commitment.jpg")}/><br/><br/>
              <Button
                color="success"
                onClick={() => this.toggleModal("demoModal")}
              >
                Our Commitment
              </Button>
            </Col>
            {/* Sart Demo Modal */}
            <Modal
              isOpen={this.state.demoModal}
              toggle={() => this.toggleModal("demoModal")}
            >
              <div className="modal-header justify-content-center">
                <button
                  className="close"
                  onClick={() => this.toggleModal("demoModal")}
                >
                  <i className="tim-icons icon-simple-remove" />
                </button>
                <h4 className="title title-up">Our Mission</h4>
              </div>
              <div className="modal-body">
                <p>
                To bridge language barriers where it’s needed most.
                We want to make communication a possibility in the most challenging circumstances, 
                so that understanding, education and change can be achieved.
                </p>
              </div>
              <div className="modal-footer">
              
                <Button
                  color="danger"
                  type="button"
                  onClick={() => this.toggleModal("demoModal")}
                >
                  Close
                </Button>
              </div>
            </Modal>
            {/* End Demo Modal */}
            {/* Start Mini Modal */}
            <Modal
              isOpen={this.state.demoModal}
              toggle={() => this.toggleModal("demoModal")}
            >
              <div className="modal-header justify-content-center">
                <button
                  className="close"
                  onClick={() => this.toggleModal("demoModal")}
                >
                  <i className="tim-icons icon-simple-remove" />
                </button>
                <h4 className="title title-up">Our Vision</h4>
              </div>
              <div className="modal-body">
                <p>
                We envisage a world where language hold no barriers.A world in which someone can visit a doctor, 
                meet a lawyer or talk to a municipality and feel at ease. 
                A world where direct communication exists between everyone, 
                where everyone understands and can be understood.
                </p>
              </div>
              <div className="modal-footer">
              
                <Button
                  color="danger"
                  type="button"
                  onClick={() => this.toggleModal("demoModal")}
                >
                  Close
                </Button>
              </div>
            </Modal>
            {/* End Mini Modal */}
            {/* Start Form Modal */}
            <Modal
              isOpen={this.state.demoModal}
              toggle={() => this.toggleModal("demoModal")}
            >
              <div className="modal-header justify-content-center">
                <button
                  className="close"
                  onClick={() => this.toggleModal("demoModal")}
                >
                  <i className="tim-icons icon-simple-remove" />
                </button>
                <h4 className="title title-up">Our Commitment</h4>
              </div>
              <div className="modal-body">
                <p>
                Travis Foundation is a non-profit foundation (a ‘Stichting’ under Dutch law). 
                As stated in Article 2 (1) of the Articles of Association 
                the organisation has the goal to bridge language barriers where that is needed most.
                In order to be able to achieve this goal, and all the necessary steps that need to be taken 
                to get there, Travis Foundation creates a global community around any 
                new language to be digitised. 
                That is what the added value of Travis Foundation is about: 
                ‘It takes a family to digitise a language, 
                and Travis Foundation is bringing that family together’.
                </p>
              </div>
              <div className="modal-footer">
              
                <Button
                  color="danger"
                  type="button"
                  onClick={() => this.toggleModal("demoModal")}
                >
                  Close
                </Button>
              </div>
            </Modal>
            {/* End Form Modal */}
          </Row>
          <br />
          <br />
          
        </Container>
        <div className="section">
          <Container>
            
            <Row className="justify-content-between align-items-center">
              <Col className="mb-5 mb-lg-0" lg="5">
                <h1 className="text-white font-weight-medium">
                Travis Foundation bridges language barriers where it's needed most
                </h1>
                <p className="text-white mt-4">
                Travis Foundation is a non-profit organisation that bridges language barriers 
                where it wasn't previously possible. 
                By compiling digital language corpora, 
                applying machine learning technology and creating communication tools, 
                we are moving closer to our vision - a world where everyone can understand everyone.
                </p>
                <Button
                  className="mt-4"
                  color="warning"
                  href="#pablo"
                >
                  Find Out More
                </Button>
              </Col>
              <Col lg="6">
                <UncontrolledCarousel
                  items={carouselItems}
                  indicators={false}
                  autoPlay={false}
                />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default JavaScript;
