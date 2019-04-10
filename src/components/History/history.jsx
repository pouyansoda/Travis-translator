import React from 'react';
import Modal from 'react-modal';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import {
    Button,
  } from "reactstrap";
 
class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPaneOpen: false,
            isPaneOpenLeft: false,
            
        };
    }
 
    componentDidMount() {
        Modal.setAppElement(this.el);
          
    }

    render() {
        const history = this.props.history && this.props.history.map((val,ind) =>{
            return (
              <div key={ind}>
                <p style={{color:"black"}}>{val.text} : {val.translate}, {val.created_at.slice(0,16)}</p>
              </div>
            )
          })
        return <div ref={ref => this.el = ref}>
            <div style={{ marginTop: '32px' }}>
               
            </div>
            <Button size='sm' onClick={ () => this.setState({ isPaneOpenLeft: true }) }>
            History
            </Button>  
            <SlidingPane
                closeIcon={<div>History</div>}
                isOpen={ this.state.isPaneOpenLeft }
                title=''
                from='right'
                width='292px'
                onRequestClose={ () => this.setState({ isPaneOpenLeft: false }) }>
                <div> {history}</div>
            </SlidingPane>
            
        </div>;
         
    }
}
 

export default History;