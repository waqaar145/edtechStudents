// import {useEffect} from 'react'
// import { EditorState, convertToRaw } from 'draft-js';
// import { Editor } from 'react-draft-wysiwyg';
// import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';
import debounce from "debounce";
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// const MyEditor = ({editorWrapperClassName, size}) => {
//   const [editorState, setEditorState] = React.useState(
//     EditorState.createEmpty()
//   );

//   const handleEditorWidth = () => {
//     document.getElementsByClassName(editorWrapperClassName)[0].style.width = (size.width - 15) + 'px'
//   }

//   const onKeyPress = () => {
//     console.log('etnre keyu pressed')
//   }

//   useEffect(() => {
//     debounce(handleEditorWidth(), 1000)
//   }, [size])

//   return (
//     <div>
//       <Editor
//         onKeyPress={onKeyPress}
//         toolbarHidden
//         editorState={editorState}
//         wrapperClassName={editorWrapperClassName}
//         onEditorStateChange={editorState => setEditorState(editorState)}
//       />
//     </div>
//   )
// }

// export default MyEditor;

import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";

const MyEditor = ({ submittedValue, editorWrapperClassName, size, all, initValue, update }) => {

  const [value, setValue] = useState(initValue ? initValue : '');

  const handleEditorWidth = (all) => {
    if (!all) {
      document.getElementsByClassName(editorWrapperClassName)[0].style.width =
      size.width - 15 + "px";
    } else {
      var divs = document.getElementsByClassName(editorWrapperClassName);
      for (var i = 0; i < divs.length; i++) {
        divs[i].style.width = size.width - 15 + "px";
      }
    }
  };

  useEffect(() => {
    debounce(handleEditorWidth(all), 1000);
  }, [size]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValue(value) 
  }

  const onKeyPress = (e) => {
    if (e.charCode === 13) {
      if (value.trim()) {
        submittedValue({
          update: !update ? false: true,
          comment: value.trim()
        });
        setValue(''.trim())
      }
    }
  }

  return (
    <Form.Group controlId="exampleForm.ControlTextarea1">
      <Form.Control 
        as="textarea" 
        onChange={onChange}
        onKeyPress={onKeyPress} 
        value={value}
        className={editorWrapperClassName} 
        rows={2} />
    </Form.Group>
  );
};

export default MyEditor;
