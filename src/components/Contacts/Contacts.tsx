import styles from './Contacts.module.css'
import avatar from '../../assets/avatar.png'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import Modal from '../Modal/Modal'
import { useEffect, useState } from 'react'
import { fetchUserContact } from '../../store/reducers/ActionCreators'

export default function Contacts() {

  const { contacts, error, isOpenContactForm, loading } = useAppSelector(state => state.contacts)
  const { userData } = useAppSelector(state => state.user)
  const [isOpenForm, setIsOpenform] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  // закрытие формы после успешного получения контакта
  useEffect(() => {
    isOpenContactForm === false && setIsOpenform(false)
  }, [isOpenContactForm])

  // Функция закрытия формы
  const closeForm = () => {
    setIsOpenform(false)
  }

  // Отправка данных формы в ActionCreators
  const submitForm = (chatId: string) => {
    dispatch(fetchUserContact(userData, chatId))
  }

  return (
    <div className={styles.contacts}>
      {contacts.map((element, index) =>
        <article className={styles.element} key={index}>
          <div className={styles.container}>
            <p className={styles.record}>{element.name}</p>
            <p className={styles.record}>{element.chatId.slice(0, 11)}</p>
          </div>
          <img src={element.avatar ? element.avatar : avatar} className={styles.images} />
        </article>
      )}
      <article className={`${styles.element} ${styles.element_type_last}`}
        onClick={() => setIsOpenform(true)}></article>
      <Modal
        isOpenForm={isOpenForm}
        submitForm={submitForm}
        closeForm={closeForm}
        errorText={error.message}
      />
    </div>

  )
}