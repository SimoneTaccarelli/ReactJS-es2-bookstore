import React from 'react';
import { Card } from 'react-bootstrap';
import { useState } from 'react';
import Mycommit from './Mycommit';
import Mymodal from './Mymodal';


function SingleBook({book}) {

    const [selected , setSelected] = useState(false);
    return (
        <>
        <Card 
        className={`book-card ${selected ? 'selected' : ''}`}
        onClick={() => setSelected(!selected)}
        >
            <Card.Img variant="top" src={book.img} style={{ height: '350px', objectFit: 'cover' }} />
            <Card.Body>
                <Card.Title>{book.title.substring(0, 15)}...</Card.Title>
                <Card.Text>{book.author}</Card.Text>
                <Card.Text className='text-center'>€ {book.price.toFixed(2)}</Card.Text>
                <div className='area-button d-flex justify-content-between align-items-center'>  
                    <div className='my-3'>
                        <Mycommit book={book}/>
                    </div>
                    <div className='my-3'>
                        <Mymodal book={book}/>
                    </div>
                </div>
            </Card.Body>
        </Card>
        
        </>

    )
}

export default SingleBook;