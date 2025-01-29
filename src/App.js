import './App.css';
import MyNav from './components/MyNav.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container } from 'react-bootstrap';
import BookCard from './components/Book.js';
import MyFooter from './components/Footer.js';
import {BookProvider} from './components/bookContext.js';




function App() {
  return (
    <BookProvider>
        <MyNav />
        <Container>
          <BookCard className='mt-5' />
        </Container>
        <Container fluid>
          <MyFooter  />
        </Container>
    </BookProvider>
  );
}

export default App;
