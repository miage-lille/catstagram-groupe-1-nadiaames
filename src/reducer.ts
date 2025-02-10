import { Loop, liftState, loop } from 'redux-loop';
import { compose } from 'redux';
import { Actions } from './types/actions.type';
import { Picture } from './types/picture.type';
import { cmdFetch } from './commands';
import { ApiState } from './types/api.type';
import { failure, loading, success } from './api';

export type State = {
  counter: number;
  pictures: ApiState;
  pictureSelected: Picture | null;
};

export const defaultState: State = {
  counter: 3,
  pictures: { kind: 'LOADING' },
  pictureSelected: null,
};

export const reducer = (state: State | undefined, action: Actions): State | Loop<State> => {
  if (!state) return defaultState; // mandatory by redux
  switch (action.type) {
    case 'INCREMENT': {
      const newCounter = state.counter + 1;
      return loop(
        { ...state, counter: newCounter, pictures: loading() },
        cmdFetch({
          type: 'FETCH_CATS_REQUEST',
          method: 'GET',
          path: `https://pixabay.com/api/?key=48746472-fa818d7d91482b4fbfa0b6b14&per_page=${newCounter}&q=cat`
        })
      );
    }
    case 'DECREMENT': {
      const newCounter = Math.max(state.counter - 1, 3);
      return loop(
        { ...state, counter: newCounter, pictures: loading() },
        cmdFetch({
          type: 'FETCH_CATS_REQUEST',
          method: 'GET',
          path: `https://pixabay.com/api/?key=48746472-fa818d7d91482b4fbfa0b6b14&per_page=${newCounter}&q=cat`
        })
      );
    }
    case 'SELECT_PICTURE':
      return { ...state, pictureSelected: action.picture };
    case 'CLOSE_MODAL':
      return { ...state, pictureSelected: null };
    case 'FETCH_CATS_COMMIT': {
      const payload = action.payload;
      return {
        ...state,
        pictures: success(
          payload.hits.map(hit => ({
            previewFormat: hit.previewURL,
            webFormat: hit.webformatURL,
            author: hit.user,
            largeFormat: hit.largeImageURL
          }))
        ),
      };
    }
    case 'FETCH_CATS_ROLLBACK':
      return {
        ...state,
        pictures: failure(action.error.message),
      };
    default:
      return state;
  }
};

export const counterSelector = (state: State) => state.counter;
export const picturesSelector = (state: State) => state.pictures;
export const getSelectedPicture = (state: State) => state.pictureSelected;

export default compose(liftState, reducer);
