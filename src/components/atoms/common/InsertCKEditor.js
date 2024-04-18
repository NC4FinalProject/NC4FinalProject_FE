import React from 'react'
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { useStore } from 'zustand';





const InsertCKEditor = ({onChange}) => {

    // const tempFileDTOList = [];

    // const { setFiles, fileDTOList, setFileDTOList } = useStore();

    // function UploadAdapterPlugin(editor) {
    //     editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    //       return {
    //         upload: async () => {
    //           const file = await loader.file;
    //           setFiles(file);
    //           return await handleUpload(file);
    //         }
    //       };
    //     };
    //   }

    //   const handleUpload = async (file) => {
    //     try {
    //         const formData = new FormData();
    //         formData.append('upload', file);
    //         const response = await axios.post('http://${process.env.REACT_APP_BACK_URL}/notice/upload', formData, {
    //           headers: {
    //             'Content-Type': 'multipart/form-data'
    //           }
    //         });
            
    //         tempFileDTOList.push({itemFilePath: response.data.itemFilePath, itemFileName: response.data.itemFileName, itemFileOrigin: response.data.itemFileOrigin});
    
    //         console.log(fileDTOList);
    //         setFileDTOList(tempFileDTOList);
    //         return {default: response.data.url};
    //     } catch (error) {
    //       console.log(error);
    //       console.error('Error uploading files: ', error);
    //       return { error: { message: 'Files upload failed' } };
    //     }
    //   };

    return (
        <CKEditor
            editor={ClassicEditor}
            data="<p></p>"
            onReady={(editor) => {
                editor.editing.view.change((writer) => {
                    writer.setStyle(
                        "height",
                        "500px",
                        editor.editing.view.document.getRoot()
                    );
                });
            }}
            onChange={onChange}
        />
    )
}

export default InsertCKEditor