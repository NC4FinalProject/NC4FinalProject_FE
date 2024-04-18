import {Grid} from '@mui/material'
import React, {useState} from 'react'
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CoTypography from '../../../atoms/common/CoTypography'
import {useChapterThreeStore} from "../../../../stores/ContentsStore";
import axios from 'axios';

const ChapterThree = () => {
    const {
        contentsData, 
        setContentsData, 
        contentsFileDTOList, 
        setContentsFileDTOList
    } = useChapterThreeStore();

    const tempFileDTOList = [];


    const handleContentChange = (event, editor) => {
        const data = editor.getData();
        setContentsData(data);
    };

    const handleUpload = async (inquiryFile) => {
        try {
          const formData = new FormData();
          formData.append("upload", inquiryFile);

          const response = await axios.post(
            `http://${process.env.REACT_APP_BACK_URL}/contents/upload`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
    
          tempFileDTOList.push({
            contentsFilePath: response.data.contentsFilePath,
            contentsFileName: response.data.contentsFileName,
            contentsFileOrigin: response.data.contentsFileOrigin,
          });
    
          setContentsFileDTOList(tempFileDTOList);
          return { default: response.data.url };
        } catch (error) {
          console.log(error);
          console.error("Error uploading files: ", error);
          return { error: { message: "Files upload failed" } };
        }
      };

    function UploadAdapterPlugin(editor) {
        editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
          return {
            upload: async () => {
              const file = await loader.file;
            return await handleUpload(file);
            },
          };
        };
      }

    return (
        <>
            <Grid container justifyContent="center" sx={{my: '2rem',}}>
                <Grid item xs={2}/>
                <Grid item xs={8}>
                    <CoTypography size="Title" style={{marginBottom: '24px'}}>강의소개</CoTypography>
                    <CKEditor
                        editor={ClassicEditor}
                        data={contentsData}
                        onReady={(editor) => {
                            editor.editing.view.change((writer) => {
                                writer.setStyle(
                                    "height",
                                    "500px",
                                    editor.editing.view.document.getRoot()
                                );
                            });
                        }}
                        onChange={handleContentChange}
                        config={{
                            extraPlugins: [UploadAdapterPlugin],
                        }}
                    />

                    
                </Grid>
                <Grid item xs={2}/>
            </Grid>
        </>
    )
}

export default ChapterThree
