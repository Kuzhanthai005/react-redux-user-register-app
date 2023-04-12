import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import UserForm from './components/UserForm';

function App() {
  return (
    <div className="App">
      <UserForm />
    </div>
  );
}

export default App;
