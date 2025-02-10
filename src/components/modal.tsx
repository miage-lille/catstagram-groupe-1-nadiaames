import styled from 'styled-components';
import ReactDOM from 'react-dom';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSelectedPicture } from '../reducer';
import { isNone } from 'fp-ts/lib/Option';

const Container = styled.div`
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 50px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.9); /* Black w/ opacity */
`;

const Button = styled.button`
  position: absolute;
  top: 15px;
  right: 35px;
  color: black;
  font-size: 40px;
  font-weight: bold;
`;

const Image = styled.img`
  margin: auto;
  display: block;
  width: 80%;
  max-width: 700px;
`;

const Author = styled.p`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: grey;
`;

const Modal = () => {
  const selectedPicture = useSelector(getSelectedPicture);
  const dispatch = useDispatch();
  if (isNone(selectedPicture)) return null;
  const picture = selectedPicture.value;
  return (
    <Container>
      <Author>Author: {picture.author}</Author>
      <Image src={picture.largeFormat} alt="Large Cat" />
      <Button onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>X</Button>
    </Container>
  );
};

const portalRoot = document.getElementById('modal');

const ModalPortal = () =>
  portalRoot ? ReactDOM.createPortal(<Modal />, portalRoot) : null;

export default ModalPortal;