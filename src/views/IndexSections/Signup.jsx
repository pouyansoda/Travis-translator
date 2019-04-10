import React from "react";
import classnames from "classnames";

import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

class Signup extends React.Component {
  state = {};
  render() {
    return (
      <div className="section section-signup">
        <Container>
          <div className="squares square-1" />
          <div className="squares square-2" />
          <div className="squares square-3" />
          <div className="squares square-4" />
          <Row className="row-grid justify-content-between align-items-center">
            <Col lg="6">
              <h3 className="display-3 text-white">
                The First English Tigrinya Translator{" "}
                <span className="text-white">in the world</span>
              </h3>
              <p className="text-white mb-3">
              Roughly 8 million people speak Tigrinya, from Eritrea and Northern Ethiopia. 
              There are 500,000 Eritrean refugees in the EU, many who aren’t literate, 
              and many more who struggle with language barriers daily. 
              But since Tigrinya is not available on any machine translation engines, 
              we created a text-text machine translation website and application for Tigrinya and English. 
              The application will translate and also define key-terms relevant to medical,
               aid and integration processes. 
               This will be further developed to translate from and into other languages. 
              </p>
              <div className="btn-wrapper">
                <Button color="primary" tag={Link} to="/translator-page">
                  Try it
                </Button>
              </div>
            </Col>
            <Col className="mb-lg-auto" lg="6">
              <Card className="card-register">
                <CardHeader>
                  <CardImg
                    alt="..."
                    src={require("../../assets/img/square-purple-1.png")}
                  />
                  <CardTitle tag="h4">translate</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form className="form">
                    <InputGroup
                      className={classnames({
                        "input-group-focus": this.state.fullNameFocus
                      })}
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="tim-icons icon-caps-small" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="English"
                        type="text"
                      />
                    </InputGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="tim-icons icon-world" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="ትግርኛ ፊደል"
                        type="text"
                      />
                    </InputGroup>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button className="btn-round" color="primary" size="lg" tag={Link} to="/translator-page">
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Signup;
