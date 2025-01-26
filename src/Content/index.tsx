import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import FilePanel from "./FilePanel";

export interface FilePanelModel {
    name: string;

}

const Content: React.FC = () => {
    const [filePanels, setFilePanels] = useState<FilePanelModel[]>(sessionStorage.getItem("filePanels") 
    ? JSON.parse(sessionStorage.getItem("filePanels")!) : []);
    const [fileName, setFileName] = useState<string>();

    useEffect(() => {
        sessionStorage.setItem("filePanels", JSON.stringify(filePanels))
    }, [filePanels])
    return <Container style={{ minHeight: "calc(100vh - 8em)" }}>
        <Row>
            <Col md={12}>
            <Card className="mt-4" style={{ height: "240px" }}>
                <Card.Header>
                    <Card.Title>Add File Names to layout</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>File Name</Form.Label>
                        <Form.Control size="lg" type="text" value={fileName} onChange={(e) => setFileName(e.target.value)} />
                    </Form.Group>
                </Card.Body>
                <Card.Footer>
                    <Button disabled={!!!fileName} onClick={() => {
                        setFilePanels([...filePanels, {name: fileName ?? ""}]);
                    }}>Add to File Layout</Button>
                </Card.Footer>
            </Card>
        </Col>
        </Row>

        {filePanels?.length > 0 && <Row className="mt-4">
            {filePanels?.map((panel, index) => <Col key={index} lg={6} md={6} sm={12} className="mb-2">
                <FilePanel panel={panel} filePanels={filePanels} setFilePanels={setFilePanels}/>
            </Col>)}
        </Row> }
    </Container>
}

export default Content;