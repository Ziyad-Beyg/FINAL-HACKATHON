import React, { useEffect, useContext } from 'react';
import { GlobalContext } from '../context/context';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  auth,
  onAuthStateChanged,
  db,
  getDocs,
  collection,
  query,
  where,
} from '../config/firebase';

import SignIn from '../screens/signin';
import Dashboard from '../screens/dashboard';

function Navigation() {
  const { state, dispatch } = useContext(GlobalContext);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        let fetchUser;
        const q = query(collection(db, 'users'), where('uid', '==', user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          fetchUser = doc.data();
          return fetchUser;
        });
        dispatch({ type: 'CURRENT_USER', payload: fetchUser });
      } else if (
        !user &&
        window.location.pathname != '/' &&
        window.location.pathname != '/signup'
      ) {
        dispatch({ type: 'CURRENT_USER', payload: {} });
        window.location.replace('/');
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<SignIn />} />
        <Route path='/home' index element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Navigation;
