import styles from './Contacts.module.css'
import avatar from '../../assets/avatar.png'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import Modal from '../Modal/Modal'
import { useEffect, useState } from 'react'
import { fetchUserContact } from '../../store/reducers/ActionCreators'
import { IUserContact } from '../../models/requestData'

interface ContactsProps {
  startChat: ({...values}: IUserContact) => void
}

export default function Contacts({startChat}: ContactsProps) {

  const { contacts, error, isOpenContactForm } = useAppSelector(state => state.contacts)
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

  // Передача данных контакта при клике на контакт
  const handleContactClick = ({...values}: IUserContact) => {
    startChat({...values})
  }

  return (
    <div className={styles.contacts}>
      {contacts.map((element, index) =>
        <article className={styles.element} key={index}
         onClick={() => handleContactClick({name: element.name, chatId: element.chatId, avatar: element.avatar})}>
          <div className={styles.container}>
            <p className={styles.record}>{element.name}</p>
            <p className={styles.record}>{element.chatId}</p>
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