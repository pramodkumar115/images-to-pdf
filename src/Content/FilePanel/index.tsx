import React, { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import { FileWithPath, useDropzone } from 'react-dropzone';
import { BsFillTrashFill, BsXLg } from "react-icons/bs";
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { FilePanelModel } from "..";
import { PDFDownloadLink } from "@react-pdf/renderer";
import RenderPDF from "../RenderPDF";
import { Form } from "react-bootstrap";

const FilePanel: React.FC<{ panel: FilePanelModel, filePanels:FilePanelModel[], setFilePanels: Function }> = ({ panel, filePanels, setFilePanels }) => {
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

    const [pageBreak, setPageBreak] = useState(true);

    useEffect(() => {
        setUploadedFiles([...uploadedFiles, ...acceptedFiles]);
    }, [acceptedFiles])

    const deleteSelectedFile = (file: FileWithPath) => {
        setUploadedFiles([...uploadedFiles?.filter(u => u.name !== file.name)]);
    }

    return <Card>
        <Card.Header className={'d-flex align-items-center'}>
            <Card.Title style={{flex:1 }}>{panel.name}</Card.Title>
            <BsXLg onClick={() => {
                const panels = filePanels?.filter(f => f.name !== panel.name);
                if (panels?.length > 0) {
                    sessionStorage.setItem("filePanels", JSON.stringify(panels));
                } else {
                    sessionStorage.removeItem("filePanels");
                }
                setFilePanels([...panels]);
            }} />
        </Card.Header>
        <Card.Body>

            <Form.Check // prettier-ignore
                type={"switch"}
                id={`pagebreak`}
                label={`Page Break`}
                checked={pageBreak}
                onChange={(e) => setPageBreak(e.target.checked)}
            />
            <div {...getRootProps({ className: 'dropzone' })}>
                <p>Drag and drop images here</p>
                <input {...getInputProps()} />
                <aside>
                    <PhotoProvider>
                        <div className="d-flex flex-wrap">
                            {uploadedFiles?.sort((f1, f2) => f1.name.localeCompare(f2.name)).map((selectedFile, index) => (
                                <div key={index} className="d-flex flex-column align-items-center">
                                    <PhotoView key={index} src={URL.createObjectURL(selectedFile)}>
                                        <img width={150} style={{ margin: "0.5em", padding: "0.5em", border: '1px solid black' }} src={URL.createObjectURL(selectedFile)} alt={selectedFile?.name} />
                                    </PhotoView>
                                    <BsFillTrashFill onClick={() => deleteSelectedFile(selectedFile)} />
                                </div>
                            ))}
                        </div>
                    </PhotoProvider>
                </aside>

            </div>
        </Card.Body>
        {uploadedFiles?.length > 0 && <Card.Footer>
            <PDFDownloadLink document={<RenderPDF images={uploadedFiles} pageBreak={pageBreak} />} fileName={`${panel.name}.pdf`}>
                Download now!
            </PDFDownloadLink>
        </Card.Footer>}
    </Card>
}

export default FilePanel;