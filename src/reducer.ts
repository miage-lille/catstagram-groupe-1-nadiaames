import { Cmd, Loop, liftState, loop } from 'redux-loop';
import { compose } from 'redux';
import { Actions } from './types/actions.type';
import { Picture } from './types/picture.type';
import { cmdFetch } from './commands';
import { ApiState } from './types/api.type';
import { failure, loading, success } from './api';
import { Option, none, some } from 'fp-ts/lib/Option';
import { fetchCatsRequest } from './actions';

export type State = {
  counter: number;
  pictures: ApiState;
  pictureSelected: Option<Picture>;
};

export const defaultState: State = {
  counter: 3,
  pictures: { kind: 'LOADING' },
  pictureSelected: none,
};

export const reducer = (state: State | undefined, action: Actions): State | Loop<State> => {
  if (!state) return defaultState; // mandatory by redux
  switch (action.type) {
    case 'INCREMENT': {
      const newCounter = state.counter + 1;
      return loop(
        { ...state, counter: newCounter },
        Cmd.action(fetchCatsRequest(newCounter)) 
      );
    }
    case 'DECREMENT': {
      const newCounter = Math.max(state.counter - 1, 3);
      return loop(
        { ...state, counter: newCounter },
        Cmd.action(fetchCatsRequest(newCounter))
      );
    }
    case 'SELECT_PICTURE':
      return { ...state, pictureSelected: some(action.picture) };
    case 'CLOSE_MODAL':
      return { ...state, pictureSelected: none };
    case 'FETCH_CATS_COMMIT': {
      const payload = action.payload;
      return {
        ...state,
        pictures: success(payload),
      };
    }
    case 'FETCH_CATS_REQUEST':
      return loop({ ...state, pictures: loading() }, cmdFetch(action));
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
