import React, { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import { FileWithPath, useDropzone } from 'react-dropzone';
import { FaTrash } from "react-icons/fa";
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { FilePanelModel } from "..";
import { PDFDownloadLink } from "@react-pdf/renderer";
import RenderPDF from "../RenderPDF";

const FilePanel: React.FC<{ panel: FilePanelModel }> = ({ panel }) => {
    const [uploadedFiles, setUploadedFiles] = useState<FileWithPath[]>([]);
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        maxFiles: 30,
        accept: {
            'image/jpeg': [],
            'image/png': [],
            'image/webp': [],
            'image/heic': [],
            'image/jfif': [],
        }
    });

    useEffect(() => {
        console.log({acceptedFiles});
        setUploadedFiles([...uploadedFiles, ...acceptedFiles]);
    }, [acceptedFiles])

    const deleteSelectedFile = (file: FileWithPath) => {
        setUploadedFiles([...uploadedFiles?.filter(u => u.name !== file.name)]);
    }

    return <Card>
        <Card.Header>
            <Card.Title>{panel.name}</Card.Title>
        </Card.Header>
        <Card.Body>
        <p>Drag and drop images into the below box</p>
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                
            <aside>
                <PhotoProvider>
                    <div className="d-flex flex-wrap">
                        {uploadedFiles.map((selectedFile, index) => (
                            <div key={index} className="d-flex flex-column align-items-center">
                            <PhotoView key={index} src={URL.createObjectURL(selectedFile)}>
                                <img width={150} style={{margin: "0.5em", padding: "0.5em", border: '1px solid black'}} src={URL.createObjectURL(selectedFile)} alt={selectedFile?.name} />
                            </PhotoView>
                            <FaTrash onClick={() => deleteSelectedFile(selectedFile)}/>
                            </div>
                        ))}
                    </div>
                </PhotoProvider>
            </aside>
                
            </div>
        </Card.Body>
        {uploadedFiles?.length > 0 && <Card.Footer>
            {/* <Button onClick={() => ReactPDF.render(<RenderPDF images={uploadedFiles}/>, `${panel.name}.pdf`)}>Convert to PDF</Button> */}
            <PDFDownloadLink document={<RenderPDF images={uploadedFiles} />} fileName={`${panel.name}.pdf`}>
                Download now!
    </PDFDownloadLink>
        </Card.Footer>}
    </Card>
}

export default FilePanel;