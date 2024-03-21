import React, { useEffect } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { SimpleUploadAdapter } from '@ckeditor/ckeditor5-upload';

function MyEditorComponent() {
  useEffect(() => {
    return () => {
      // 컴포넌트가 언마운트될 때 CKEditor 인스턴스 해제
      ClassicEditor.destroy().then(() => {
        console.log('CKEditor 인스턴스가 성공적으로 해제되었습니다.');
      }).catch(error => {
        console.error('CKEditor 인스턴스 해제 중 오류 발생:', error);
      });
    };
  }, []);
}

const InsertCKEditor = () => {
  return (
    <CKEditor
    editor={ ClassicEditor }
    data="<p></p>"


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