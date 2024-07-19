import './App.css';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from './components/common/Header';
import Router from './components/common/Router';
import 'bootstrap/dist/css/bootstrap.min.css';
import { retrieveUserToken } from './components/redux/UserActions';
import { retrieveAdminToken } from './components/redux/AdminActions';

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(retrieveUserToken())
    dispatch(retrieveAdminToken())
  },[dispatch])

  return (
      <React.Fragment>
        <header>
          <Header/>
        </header>
        <main>
          <Router/>
        </main>
      </React.Fragment>
  );
}

export default App;
