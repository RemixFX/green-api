import { FormEvent, useRef } from 'react'
import styles from './login.module.css'
import { getStateInstance } from '../../api/api'

export default function Login() {

  const idRef = useRef<HTMLInputElement>(null)
  const tokenRef = useRef<HTMLInputElement>(null)
  const dialogfRef = useRef<HTMLDialogElement>(null)

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (idRef.current && tokenRef.current) {
      try {
        const response: {stateInstance: string} = await getStateInstance({
          idInstance: idRef.current.value,
          apiTokenInstance: tokenRef.current.value
        })
        console.log(response)
      } catch (error: unknown) {
        console.log(error)
      }
    }
    
    //dialogfRef.current?.close()
  }

  return (
    <dialog className={styles.dialog} ref={dialogfRef} open={true}>
      <div className={styles.container}>
        <h1 className={styles.header}>Добро пожаловать в GREEN-API</h1>
        <p className={styles.paragraph}>протестируйте возможности отправки и приема сообщений на WhatsApp любому номеру</p>
        <form className={styles.form} onSubmit={e => submitForm(e)}>
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
      </div>
    </dialog>
  )
}