import React from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const Header: React.FC = () => {
    return <Navbar bg="dark" data-bs-theme="dark">
        <Container fluid  className="w-100 justify-content-md-center">
                <Navbar.Brand>Images to PDF</Navbar.Brand>
        </Container>
    </Navbar>
}

export default Header;