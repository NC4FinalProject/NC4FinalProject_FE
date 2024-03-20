import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { SimpleUploadAdapter } from '@ckeditor/ckeditor5-upload';


const InsertCKEditor = () => {
  return (
    <CKEditor
    editor={ ClassicEditor }
    data="<p>Hello from CKEditor 5!</p>"

    // config={{
    //   toolbar: [ 'uploadImage', ...ClassicEditor.defaultConfig.toolbar.items ],
    //   simpleUpload: {

    //     // npm install -g json-server
    //     // json-server --watch db.json --port 3001

    //     // The URL that the images are uploaded to.
    //     // uploadUrl: 'http://example.com/image/upload/',
    //     uploadUrl: 'http://localhost:3001/images',

    //     // Enable the XMLHttpRequest.withCredentials property.
    //     // withCredentials: true,

    //     // Headers sent along with the XMLHttpRequest to the upload server.
    //     // headers: {
    //     //   'X-CSRF-TOKEN': 'CSRF-Token',
    //     //   Authorization: 'Bearer <JSON Web Token>'
    //     // }
    //   }
    // }}

    onReady={ ( editor ) => {
      console.log( "CKEditor5 React Component is ready to use!", editor );
    } }
    onChange={ ( event, editor ) => {
      const data = editor.getData();
      console.log( { event, editor, data } );
    } }
  />
  )
}

export default InsertCKEditor