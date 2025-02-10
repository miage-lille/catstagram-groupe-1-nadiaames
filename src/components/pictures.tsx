import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { picturesSelector, getSelectedPicture } from '../reducer';
import Modal from './modal';
import { isSome, fromNullable } from 'fp-ts/lib/Option';

const Container = styled.div`
  padding: 1rem;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
`;

const Image = styled.img`
  margin: 10px;
  object-fit: contain;
  transition: transform 1s;
  max-width: fit-content;
  &:hover {
    transform: scale(1.2);
  }
`;

const Loading = styled.div`
  font-size: 1.5rem;
  color: indigo;
`;

const ErrorMessage = styled.div`
  font-size: 1.5rem;
  color: red;
`;

const Pictures = () => {
  const pictures = useSelector(picturesSelector);
  const pictureSelected = useSelector(getSelectedPicture);
  const dispatch = useDispatch();

  return (
    <Container>
      {pictures.kind === 'LOADING' && <Loading>Loading pictures...</Loading>}
      {pictures.kind === 'FAILURE' && <ErrorMessage>Error: {pictures.error}</ErrorMessage>}
      {pictures.kind === 'SUCCESS' &&
      pictures.pictures.map((picture) => (
      <Image
        key={picture.previewFormat}
        src={picture.previewFormat}
        alt={`Cat by ${picture.author}`}
        onClick={() => dispatch({ type: 'SELECT_PICTURE', picture })}
      />
      ))}
      {isSome(fromNullable(pictureSelected)) && <Modal />}
    </Container>
  );
};

export default Pictures;
