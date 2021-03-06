import React from "react"
import injectSheet from "react-jss"
const DEFAULT_HEIGHT = 20;

const styles = {
  container: {
    position: 'relative',
    flex:"1 1 100vw"
  },
  titleField:{
    color:"#333",
    width:'94%',
    resize:"vertical",
    overflow:'hidden',
    backgroundColor:'#0000',
    fontFamily:"Arial",
    fontSize:"14px",
    fontWeight:"800",
    transition:"height 0.15s ease-in-out",
    margin:"8px 12px 4px 8px",
    minHeight: '20px',
    flex:'1 0 100vw',
    border:"none",
    "&:focus":{
      outline:"none"
    }
  },

  textarea: {
    outline: 'none',
    padding: '0',
    boxShadow: 'none',
    border: '2px solid black',
    overflow: 'hidden',  // Removes scrollbar
    transition: 'height 0.2s ease'
  },

  textareaGhost: {
    opacity: '0.3',
    display: 'block',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    visibility: 'hidden',
    position: 'absolute',
    top: '0'
  }
}

class Textarea extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      height: DEFAULT_HEIGHT,
      value: this.props.value,
    };

    this.setValue = this.setValue.bind(this);
    this.setFilledTextareaHeight = this.setFilledTextareaHeight.bind(this);
  }

  componentDidMount() {
    this.mounted = true;

    this.setFilledTextareaHeight();
  }

  setFilledTextareaHeight() {
    if (this.mounted) {
      const element = this.ghost;

      this.setState({
        height: element.clientHeight,
      });
    }
  }

  setValue(event) {
    const { value }= event.target;

    this.setState({ value });
  }

  getExpandableField() {
    const isOneLine = this.state.height <= DEFAULT_HEIGHT;
    const { height, value } = this.state;

    return (
      <div>
        <textarea
          className={this.props.classes.titleField}
          name="textarea"
          id="textarea"
          autoFocus={true}
          defaultValue={value}
          style={{
            height,
            resize: isOneLine ? "none" : null
          }}
          onChange={
            (e)=>{
              this.setValue(e)
              this.props.onEditContent(e,this.props.id)
            }
          }
          onKeyUp={this.setFilledTextareaHeight}
          
        />
      </div>
    );
  }

  getGhostField() {
    return 
    
  }

  render() {
    return (
      <div className={this.props.classes.container}>
        {this.getExpandableField()}
        <div
          className={this.props.classes.titleField + " " + this.props.classes.textareaGhost}
          ref={(c) => this.ghost = c}
          aria-hidden="true"
        >
          {this.state.value}
        </div>
      </div>
    );
  }
}

export default injectSheet(styles)(Textarea)