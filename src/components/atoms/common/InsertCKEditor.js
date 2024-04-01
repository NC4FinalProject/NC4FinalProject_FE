import React, { useEffect } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const InsertCKEditor = () => {
  return (
    <CKEditor
    editor={ ClassicEditor }
    data="<p></p>"

    onReady={ ( editor ) => {
      // console.log( "CKEditor5 React Component is ready to use!", editor );
      editor.editing.view.change((writer) => {
        writer.setStyle(
            "height",
            "500px",
            editor.editing.view.document.getRoot()
        );
        });
    } }
    onChange={ ( event, editor ) => {
      const data = editor.getData();
      console.log( { event, editor, data } );
    } }
  />
  )
}

export default InsertCKEditor