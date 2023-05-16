import { FormEvent, useEffect, useRef } from 'react'
import styles from '../Login/Login.module.css'
import { useAppSelector } from '../../store/hooks'
import { IUserData } from '../../models/requestData'
import ErrorFrame from '../ErrorFrame/ErrorFrame'

export default function Login({submitForm}: {submitForm: ({...args}: IUserData) => void}) {

  const idRef = useRef<HTMLInputElement>(null)
  const tokenRef = useRef<HTMLInputElement>(null)
  const dialogfRef = useRef<HTMLDialogElement>(null)
  const {userData, error} = useAppSelector(state => state.user)

  // Закрытие окна формы, если проверка авторизации прошла успешно
  useEffect(() => {
    if(userData.idInstance !== '') {
      dialogfRef.current?.close()
    }
  },[userData])

  // Передача функции с данными полей на уровень выше
  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (idRef.current && tokenRef.current) {
      submitForm({
        idInstance: idRef.current.value,
        apiTokenInstance: tokenRef.current.value
      })
  }
}

  return (
    <dialog className={styles.dialog} ref={dialogfRef} open={true}>
      <div className={styles.container}>
        <h1 className={styles.header}>Добро пожаловать в GREEN-API</h1>
        <p className={styles.paragraph}>протестируйте возможности отправки и приема сообщений на WhatsApp любому номеру</p>
        <form className={styles.form} onSubmit={e => handleSubmitForm(e)}>
          <div className={styles.field}>
            <label className={styles.field__name}>IdInstance:</label>
            <input className={styles.field__input} type="text" required
              ref={idRef} />
          </div>
          <div className={styles.field}>
            <label className={styles.field__name}>ApiTokenInstance:</label>
            <input className={styles.field__input} type="text" required
              ref={tokenRef} data-title={''} />
          </div>
          <p className={styles.registration}>
            Еще нет данных GREEN-API?
            <a className={styles.registration__link} href='https://console.green-api.com/auth/register'
              target='_blanc'>Зарегистрируйтесь!</a>
          </p>
          <button className={styles.button}>Войти</button>
        </form>
        <ErrorFrame text={error.message}/>
      </div>
    </dialog>
  )
}