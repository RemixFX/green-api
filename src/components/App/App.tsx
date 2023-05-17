/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import styles from '../App/App.module.css'
import Login from '../Login/Login'
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { fetchUserAuthorization } from '../../store/reducers/ActionCreators';
import { IUserData } from '../../models/requestData';
import Interface from '../Interface/Interface';
import { deleteNotification, receiveNotification } from '../../api/api';
import { messagesSlice } from '../../store/reducers/messagesSlice';

function App() {

  const dispatch = useAppDispatch();
  const { userData } = useAppSelector(state => state.user)
  const { contacts } = useAppSelector(state => state.contacts)

  // Запуск получения и удаления уведомлений новых сообщений,
  // если есть открытые контакты
  useEffect(() => {
    if (contacts.length > 0) {
      setInterval(() => {
        receiveNotification(userData)
          .then((res) => {
            if (res === null) return
            if (res.body.messageData.textMessageData.textMessage) {
              dispatch(messagesSlice.actions.dataFetchingSuccess({
                idMessage: res.body.idMessage,
                message: res.body.messageData.textMessageData.textMessage,
                incoming: true
              }))
            }
            return res.receiptId
          })
          .then((receiptId) => {
            if (!receiptId) return
            deleteNotification(userData, receiptId)
          })
          .catch((err) => console.log(err))
      }, 12000)
    }
  }, [contacts])

  // отправка данных авторизации и добавление в стейт
  const submitForm = (data: IUserData) => {
    dispatch(fetchUserAuthorization(data))
  }

  return (
    <div className={styles.page}>
      <Login submitForm={submitForm} />
      <Interface />
    </div>
  )
}

export default App
