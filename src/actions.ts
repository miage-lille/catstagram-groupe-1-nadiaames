import { CloseModal, Decrement, FetchCatsCommit, FetchCatsRequest, FetchCatsRollback, Increment, SelectPicture } from './types/actions.type';
import { Picture } from './types/picture.type';

export const increment = (): Increment => ({ type: 'INCREMENT' });
export const decrement = (): Decrement => ({ type: 'DECREMENT' });

export const fetchCatsRequest = (counter: number): FetchCatsRequest => ({
  type: 'FETCH_CATS_REQUEST',
  method: 'GET',
  path: `https://pixabay.com/api/?key=48746472-fa818d7d91482b4fbfa0b6b14&per_page=${counter}&q=cat`,
});

export const fetchCatsCommit = (payload: { hits: Array<{ previewURL: string, webformatURL: string, user: string, largeImageURL: string }> }): FetchCatsCommit => ({ 
  type: 'FETCH_CATS_COMMIT', 
  payload 
});

export const fetchCatsRollback = (error: Error): FetchCatsRollback => ({ type: 'FETCH_CATS_ROLLBACK', error });

export const selectPicture = (picture: Picture): SelectPicture => ({
  type: 'SELECT_PICTURE',
  picture,
});

export const closeModal = (): CloseModal => ({
  type: 'CLOSE_MODAL',
});