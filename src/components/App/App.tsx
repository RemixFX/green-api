import { useEffect, useState } from 'react'
import styles from './App.module.css'
import Login from '../Login/Login'
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { fetchUserAuthorization } from '../../store/reducers/ActionCreators';
import { IUserData } from '../../models/requestData';

function App() {

  const {userData, error, loading} = useAppSelector(state => state.user)
  const dispatch = useAppDispatch();

  const submitForm = (data: IUserData) => {
    dispatch(fetchUserAuthorization(data))
  }

  console.log(userData, error)

  return (
    <div className={styles.page}>
      <Login submitForm={submitForm}/>
    </div>
  )
}

export default App
