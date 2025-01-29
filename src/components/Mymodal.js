import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Mymodal({asin}) {
  const [show, setShow] = useState(false);
  //stato per i commenti
  const [comments , setComments] = useState([]);
  const [loading , setLoading] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    getComments();
  };

   const getComments = () => {
    setLoading(true);
    fetch(`https://striveschool-api.herokuapp.com/api/comments/`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Nzc2Y2MwNmNmOGIyNDAwMTU3NzFmYTkiLCJpYXQiOjE3Mzc3NDQ5NzgsImV4cCI6MTczODk1NDU3OH0.pAKu-blSFPdC9wQschCGyVUxlIzJcokrIjDynNdFl_g",
        },
    })
    .then((res) => res.json())
    .then((data) => {
        setComments(data);
        console.log("Commenti ricevuti:", data);
        setLoading(false);
    })
    .catch((err) => console.log("Errore nel recupero commenti:", err));
  } 

 if(loading){
    return (
        <div className= 'spinner-container'>
        <div className='spinner'>

        </div>
        </div>
        )
 }

 const deleteComment = (id) => {
    setLoading(true);
  fetch(`https://striveschool-api.herokuapp.com/api/comments/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Nzc2Y2MwNmNmOGIyNDAwMTU3NzFmYTkiLCJpYXQiOjE3Mzc3NDQ5NzgsImV4cCI6MTczODk1NDU3OH0.pAKu-blSFPdC9wQschCGyVUxlIzJcokrIjDynNdFl_g",
    },
    method: 'DELETE',
  })
  .then(() => {
    getComments();
  })
 }


 const changeComment = (id) => {
    setLoading(true);
    let newComment = prompt("Inserisci il nuovo commento")
    console.log(newComment)
    modifyComment(id, newComment)
    setLoading(false);
 }

 const modifyComment = (id, newComment) => {
    fetch(`https://striveschool-api.herokuapp.com/api/comments/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Nzc2Y2MwNmNmOGIyNDAwMTU3NzFmYTkiLCJpYXQiOjE3Mzc3NDQ5NzgsImV4cCI6MTczODk1NDU3OH0.pAKu-blSFPdC9wQschCGyVUxlIzJcokrIjDynNdFl_g",
        },
        method: 'PUT',
        body: JSON.stringify({
            comment: newComment
        })
    })
    .then((res) => res.json())
    .then((data) => {
        console.log("Commento modificato con successo" , data)
    })
    .catch((err) => console.log(err))
 }

return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Recensioni
      </Button>
      <Modal 
        show={show} 
        onHide={handleClose}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Recensioni</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <ul key={comment._id}>
                <li>{comment.comment} <Button variant="success" onClick={() => changeComment(comment._id)}>Modify</Button> <Button variant="danger" onClick={() => deleteComment(comment._id)}>Delete</Button></li>
                <li>Voto: {comment.rate}</li>
              </ul>
            ))
          ) : (
            <p>Nessuna recensione disponibile</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Mymodal;