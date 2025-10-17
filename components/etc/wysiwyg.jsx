import { useEffect, useState } from "react";
import Editor from 'react-simple-wysiwyg';
//import { Editor } from "react-draft-wysiwyg";

/**
 * @param callback 
 * @param defaultValue
 */
const Wysiwyg = ({callback, defaultValue}) => {
    const [html, setHtml] = useState(defaultValue || '');

    useEffect(()=>{
        setHtml(defaultValue || '');
        //alert(defaultValue)
    }, []);

  function onChange(e) {
    setHtml(e.target.value);
    callback?.(e.target.value);
  }

  return (
    <Editor value={html} onChange={onChange} />
  );
};

export default Wysiwyg;
