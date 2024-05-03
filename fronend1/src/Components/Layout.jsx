import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { Outlet } from 'react-router-dom';
function Layout() {
  return (
    <div>
    <Navbar expand="md sm" sticky="top" className="bg-info bg-gradient">
      <Container>
        <Navbar.Brand className='text-info-emphasis' href="/">FEATHERBAGS.</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className='text-info-emphasis  p-3 ms-2 rounded'  href="/">Home </Nav.Link><h1 className='text-info-emphasis'>|</h1>
            <Nav.Link className='text-info-emphasis  p-3 ms-2 rounded' href="/Contact">Contact</Nav.Link><h1 className='text-info-emphasis'>|</h1>
            <Nav.Link className='text-info-emphasis  p-3 ms-2 rounded' href="/About">About</Nav.Link><h1 className='text-info-emphasis'>|</h1>
            <Nav.Link className='text-info-emphasis  p-3 ms-2 rounded' href="/Login">Login</Nav.Link><h1 className='text-info-emphasis'>|</h1>
            <Nav.Link className='text-info-emphasis  p-3 ms-2 rounded' href="/Registration">Sign Up</Nav.Link><h1 className='text-info-emphasis'>|</h1>
            <Nav.Link className='text-info-emphasis  p-3 ms-2 rounded' href="/Shop">Shop</Nav.Link><h1 className='text-info-emphasis'>|</h1>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
            <Outlet/>
            
</div>
  );
}

export default Layout;