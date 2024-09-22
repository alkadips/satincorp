// src/App.js
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store';
import './index.css';
import Quiz from './components/Questions';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="h-screen flex items-center justify-center bg-gray-100">
          <Quiz />
        </div>
      </PersistGate>
    </Provider>
  );
};

export default App;
