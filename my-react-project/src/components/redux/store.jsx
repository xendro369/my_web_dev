import { createStore } from 'redux';

import AuthReducer from './reducer/AuthReducer';

const store = createStore(AuthReducer);

export default store;
