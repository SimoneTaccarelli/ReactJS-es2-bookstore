import React from 'react';
import books from '../dati/history.json'
import { Button, Col, Row } from 'react-bootstrap';
import SingleBook from './singleBook';
import { useState , useContext } from 'react';
import {BookContext} from './bookContext.js';



function BookCard() {
  const {selectquery} = useContext(BookContext);
  const [visible, setVisible] = useState(12);
  function showMore() {
    setVisible(visible + 12);
  }
  const filteredBooks = books.filter((book) => 
    selectquery ? book.title.toLowerCase().includes(selectquery.toLowerCase()) : true
  );

  return (
    <>
      <div className="container">
        <Row className='mt-5'>
          {filteredBooks.slice(0, visible).map((book) => {
            return (
              <Col md={4} lg={3} xs={12} key={book.asin} className='book mb-5'>
                <SingleBook book={book} />
              </Col>
            )
          })}
        </Row>
      </div>
      {visible < books.length && (
        <div className='text-center mb-4'>
          <Button onClick={showMore}>Mostra altri</Button>
        </div>
      )}
    </>
  );
}

export default BookCard;