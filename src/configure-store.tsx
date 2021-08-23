import { createStore } from 'redux';
import kanbanReducer from './store/kanbanReducer';

export const store = createStore(kanbanReducer);