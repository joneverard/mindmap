import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState} from 'draft-js';
import '../style/Draft.css';

class NodeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.setState = this.setState.bind(this);
    // this.onChange = this.onChange.bind(this);
    // this.onChange = (editorState) => {
    //   this.props.onEditorChange(editorState);
    //   this.setState({editorState});
    // };
    this.onChange = (editorState) => this.props.onEditorChange(editorState);
  }


  // onChange(editorState) {
  //   this.props.onEditorChange(editorState);
  // }
  render() {
    return (
      <div className="editor" style={{resize: (this.props.edit ? 'both' : 'none')}}>
        <Editor
          readOnly={!this.props.edit}
          editorState={this.props.editorState}
          onChange={this.onChange} />
      </div>
    );
  }
}

export default NodeEditor;