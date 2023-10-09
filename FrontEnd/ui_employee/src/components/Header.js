import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Header = (props) => {
  return (
    <>
      <br />
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="/">Employee</Nav.Link>
            <Nav.Link href="/department">Department</Nav.Link>
            <Nav.Link href="/project">Project</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
export default Header;