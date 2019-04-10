import React from "react";
import classnames from "classnames";
import axios from 'axios';
import History from '../../components/History/history';
import '../../assets/css/voice.css';
import '../../assets/css/style.css';
import { Icon} from 'antd';
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
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

//Core components
import ExamplesNavbar from "../../components/Navbars/ExamplesNavbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
// const { Paragraph } = Typography;
//Voice rec code starts
const BrowserSpeechRecognition =
  typeof window !== "undefined" &&
  (window.SpeechRecognition ||
    window.webkitSpeechRecognition ||
    window.mozSpeechRecognition ||
    window.msSpeechRecognition ||
    window.oSpeechRecognition);
const recognition = BrowserSpeechRecognition
  ? new BrowserSpeechRecognition()
  : null;
  let listening = true;
let pauseAfterDisconnect = false;
let interimTranscript = "";
let finalTranscript = "";
//Voice rec code ends

class TranslatorPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      squares1to6: "",
      squares7and8: "",
      input : '',
      output : '',
      token : '',
      toggle: 0,
      inputCorrect: '',
      like: 0,
      oneLike: 0,
      interimTranscript,
      finalTranscript,
      listening: true,
      answer: "", 
      situation: "",
      nowlistening: true,
      history:[]
  }
  this.speaker = new SpeechSynthesisUtterance();
  this.speaker.lang = "en-US";
 
}

componentDidMount = () => {

  axios.get('http://localhost:8080/token')
    .then( response => {
    this.setState({token : response.data.token});
    // console.log(response)
    })
    .catch(function (error) {
      console.log(error);
  });

  document.body.classList.toggle("translator-page");
  document.documentElement.addEventListener("mousemove", this.followCursor);

  axios.interceptors.request.use (
     config => {
      const token = this.state.token;
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      return Promise.reject (error);
    }
  );
}
  componentWillUnmount() {
    document.body.classList.toggle("translator-page");
    document.documentElement.removeEventListener(
      "mousemove",
      this.followCursor
    );
  }

  sendFrom = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8080/new/correctWord', {
        text:this.state.input ,
        oldTranslate:this.state.output,
        newTranslate:this.state.inputCorrect
    }).then((response) => {
        console.log(response);
        alert("Thank you for your submission");
    }).catch((error)=>{
        console.log(error);
        // this.setState({errors : error.response.data.errors});
    });
    
  }

  input = (e) => {  
    this.setState({ input :  e.target.value })
  }
  inputCorrect = (e) => {  
    this.setState({ inputCorrect :  e.target.value })
  }
  translateNow = e =>{
    e.preventDefault();
    if(!this.state.input){
      alert('please enter a text to translate')
    }
    this.state.toggle === 0?  
    axios.get(`http://localhost:8080/words/${this.state.input}`)
    .then( response => {
     
     console.log(response)
    this.setState({output : response.data.words.translate});
    this.setState({like : response.data.words.like});
    
   
      axios.post('http://localhost:8080/add/history', {
          text:this.state.input ,
          translate:this.state.output,
      })
      .catch((error)=>{
          console.log(error);
         
      });
    

    axios.get('http://localhost:8080/get/history')
    .then( response => {
        console.log(response)
      this.setState({history: response.data.history})
      console.log('history', response.data.history)
    })
    })
    .then( 
      this.addHistory
    )
    .then(
      this.getHistory
    )
    .catch(function (error) {
      console.log(error);
    })
    :
    axios.get(`http://localhost:8080/wordsTi/${this.state.input}`)
    .then( response => {
     
     console.log(response)
    this.setState({output : response.data.words.text});
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  disLikeClicked = e => {
    e.preventDefault();

    let id = document.getElementById('editDiv')

    id.className = 'showEditTranslate';

  }
oneLike1 = e => {
  e.preventDefault();
  this.state.oneLike===0 ? this.likeClicked(e): console.log('ok') ;
}

  likeClicked = e => {
    e.preventDefault();

    const title =this.state.input
          axios.put(`http://localhost:8080/add/like/${title}`, {
            text:this.state.input ,
            translate:this.state.output,
        })
          .then(()=>{
            this.translateNow(e)
          }).catch((err)=>{
            console.log(err)
          })
          this.setState({oneLike:1})
  }
  
  toggleButton=() =>{
    this.setState({input:''});
    this.setState({output:''});
    this.setState({inputCorrect:''});
    this.state.toggle === 0 ?
    this.setState({toggle:1})
    : this.setState({toggle:0})
  }

 

  btnClicked = e => {
    e.preventDefault();

    let id = document.getElementById('editDiv')

    id.className = 'showEditTranslate';

  }

  voiceButton = (event) =>{
    recognition.start();
      if (recognition) {
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.onresult = this.updateTranscript.bind(this);
        recognition.onend = this.onRecognitionDisconnect.bind(this);
        this.setState({ listening });
        console.log(this.state.listening)
  
      }
      else {
        recognition.stop();
      }
    }
    updateTranscript(event) {
      console.log(event.results)
    interimTranscript = "";
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        finalTranscript = event.results[i][0].transcript;
        this.answerToUser(finalTranscript);
        this.setState({ finalTranscript, nowlistening: false });
      } else {
        speechSynthesis.cancel();
        interimTranscript = this.concatTranscripts(
          interimTranscript,
          event.results[i][0].transcript
        );
        this.setState({ interimTranscript, nowlistening: true });
      }
    }

  }
  concatTranscripts(...transcriptParts) {
    return transcriptParts
      .map(t => t.trim())
      .join(" ")
      .trim();
  }
  startListening = () => {
    if (recognition && !listening) {
      try {
        recognition.start();
      } catch (DOMException) {
        // Tried to start recognition after it has already started - safe to swallow this error
      }
      listening = true;
      this.setState({ listening });
        setTimeout(recognition, 2000);
    }
  };
  stopListening = () => {
    listening = false;
    this.setState({ listening:"" });
    this.disconnect("STOP");
  };
  disconnect = disconnectType => {
    if (recognition) {
      switch (disconnectType) {
        case "STOP":
        default:
          pauseAfterDisconnect = true;
          recognition.stop();
      }
    }
  };
    answerToUser = (arg) => {
          if (arg.includes("cool guys")) {
              this.setState({ answer: "ted" });
              this.setState({ output: "ተድ" });  
            } 
        else if (arg.includes("apple")) {
          this.setState({ answer: "tufaḧ" });
          this.setState({ output: "ቱፋሕ " });
        } 
        else if (arg.includes("car")) {
          this.setState({ answer: "mekina" });
          this.setState({ output: "መኪና " });
        }
        else if (arg.includes("hello")) {
          this.setState({ answer: "selam" });
          this.setState({ output: "ሰላም " });
        }
        else if (arg.includes("thank you")) {
          this.setState({ answer: "yeq̈enyeley" });
          this.setState({ output: "የቐንየለይ " });
        }
         else if (arg.includes("how are you")) {
          this.setState({ answer: "kemey 'aleḱi" });
          this.setState({ output: " ከመይ ኣለኺ፧ " });
        } 
         else if (arg.includes("ok") ) {
          this.setState({answer: "ḧray"});
          this.setState({ output: " ሕራይ" });
        }
          else if (arg.includes("stop") ) {
            this.stopListening();
            this.setState({answer: "ẗeẗew bele"});
            this.setState({ output: " ጠጠው በል" });
        } 
        else {
          this.setState({
            answer:""});
        }
      this.speaker.text = this.state.answer;
      speechSynthesis.speak(this.speaker);
    }
    onRecognitionDisconnect() {
      listening = false;
      if (pauseAfterDisconnect) {
        this.stopListening();
        this.setState({ listening });
      } else {
        this.startListening();
      }
      pauseAfterDisconnect = false;
    }



  render() {
    var transcript = "";
    transcript += interimTranscript;
    return (
      <>
        <ExamplesNavbar />
        <div className="wrapper">
          <div className="page-header">
            <div className="page-header-image" />
            <div className="content">
              <Container>
                <Row>
                  <Col className="offset-lg-0 offset-md-3" lg="5" md="6">
                    <div
                      className="square square-7"
                      id="square7"
                      style={{ transform: this.state.squares7and8 }}
                    />
                    <div
                      className="square square-8"
                      id="square8"
                      style={{ transform: this.state.squares7and8 }}
                    />  
                    {/* the english card start */}
                    <Card className="card-register">
                      <CardHeader>
                        <CardImg
                          alt="..."
                          src={require("../../assets/img/square-purple-1.png")}
                        />
                        <CardTitle tag="h4">
                        {this.state.toggle === 0? 'English' :'ትግርኛ' }
                        </CardTitle>
                      </CardHeader>

                      <CardBody>
    
                        <Form className="form" onSubmit={this.translateNow} >
                          <InputGroup
                            className={classnames({
                              "input-group-focus": this.state.fullNameFocus
                            })}
                          >
                            <Input
                              placeholder={transcript}
                              type="text"
                              onFocus={e =>
                                this.setState({ fullNameFocus: true })
                              }
                              onBlur={e =>
                                this.setState({ fullNameFocus: false })
                                
                              }
                              onChange={this.input}
                            />
                          </InputGroup>
                          <Button className="btn-round" color="primary" size="lg" >
                          Translate
                        </Button>
                        </Form>  
                        <div className="voiceStuffs">
                         {/* <p>{transcript}</p>  */}
                          {/* <p className="answer">{this.state.answer}</p>  */}
                        {transcript ? <p>Listening..</p>:<p></p>}
                      
                         </div>
                         <button
                         className="fas fa-microphone voiceIcon"
                           id="taskInput"
                           onClick={this.voiceButton}
                         ></button>

                      </CardBody>
                      <CardFooter>
                      
                      </CardFooter>
                    </Card>
                    </Col>
                    {/* the english card finish */}
                   
                    <Button size='sm' style={{height:400}} onClick={this.toggleButton} >← →</Button> 
                   
                    {/* the tig card start */}
                    <Col className="offset-lg-0 offset-md-3" lg="5" md="6">
                    <Card className="card-register">
                      <CardHeader>
                        <CardImg
                          alt="..."
                          src={require("../../assets/img/square-purple-1.png")}
                        />
                        <CardTitle tag="h4">
                        {this.state.toggle === 0? 'ትግርኛ' : 'English' }
                        </CardTitle>
                      </CardHeader>
                      <CardBody>
                      
                        <Form className="form">
                          <InputGroup
                            className={classnames({
                              "input-group-focus": this.state.fullNameFocus
                            })}
                          >
                        <div>{ this.state.output && this.state.output ? 
                                <div>
                                  <div>
                                   <Input
                                   value={this.state.output}
                                   />
                                   
                                  </div>
                                  
                                  <div>
                                  <Button className="btn-round" color="primary" size="lg" onClick={this.oneLike1}>
                                    <Icon type="like" /> {this.state.like}
                                  </Button>
                                  <Button className="btn-round" color="primary" size="lg" onClick={this.disLikeClicked}>
                                    <Icon type="dislike" />
                                  </Button>
                                  
                                  
                                  </div><br />
                                  <div id='editDiv' className='hideEditTranslate'>
                                  <h4>suggest an edit</h4>


                                  
                                    <Input
                                      type="text"
                                      
                                      // onFocus={e =>
                                      //   this.setState({ fullNameFocus: true })
                                      // }
                                      // onBlur={e =>
                                      //   this.setState({ fullNameFocus: false })
                                      // }
                                      // onChange={this.inputCorrect}
                                    />
                                    <Button className="btn-round" color="primary" size="sm" onClick={this.sendFrom}>
                                      Submit
                                    </Button>
                                  </div>
                                </div>
                              
                             : <Input
                            
                                /> 
                          }</div>
                          </InputGroup>
                        </Form>  
                      </CardBody>
                      <CardFooter>
                      </CardFooter>
                    </Card>
                    </Col>
                    {/* the tig card ends */}                    
                    <History history={this.state.history}/>  
                </Row>
                <div className="register-bg" />
                <div
                  className="square square-1"
                  id="square1"
                  style={{ transform: this.state.squares1to6 }}
                />
                <div
                  className="square square-2"
                  id="square2"
                  style={{ transform: this.state.squares1to6 }}
                />
                <div
                  className="square square-3"
                  id="square3"
                  style={{ transform: this.state.squares1to6 }}
                />
                <div
                  className="square square-4"
                  id="square4"
                  style={{ transform: this.state.squares1to6 }}
                />
                <div
                  className="square square-5"
                  id="square5"
                  style={{ transform: this.state.squares1to6 }}
                />
                <div
                  className="square square-6"
                  id="square6"
                  style={{ transform: this.state.squares1to6 }}
                />

              </Container>
              <div>
                  <h4>
                    We use Keyman. A free Tigringnan keyboard.
                    Please follow the instructions 
                    in the link <a href='https://keyman.com/tigrigna/' target='_blank' rel="noopener noreferrer">HERE</a> 
                    to download it on your device
                  </h4>
                </div>
                
            </div>
          </div>
          <Footer />
        </div>
      </>
    );
  }
}

export default TranslatorPage;
