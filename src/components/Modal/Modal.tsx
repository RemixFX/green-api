import { FormEvent, MouseEvent, useEffect, useRef } from 'react'
import styles from './Modal.module.css'
import ErrorFrame from '../ErrorFrame/ErrorFrame';

interface PropsModal {
  isOpenForm: boolean;
  submitForm: (arg: string) => void;
  closeForm: () => void;
  errorText: string;
}

export default function Modal({ isOpenForm, submitForm, closeForm, errorText }: PropsModal) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const idRef = useRef<HTMLInputElement>(null)

  // Закрытие и открытие формы в зависимости от props
  useEffect(() => {
    const modal = dialogRef.current
    if (isOpenForm && modal?.open === false) {
      modal?.showModal()
    }
    if (!isOpenForm) {
      if (idRef.current) idRef.current.value = '';
      modal?.close()
    }
    // Отправка функции, что область должна быть закрыта, при нажатии на 'Escape'
    modal?.addEventListener('close', closeForm)
    return () => {
      modal?.removeEventListener('close', closeForm)
    }
  }, [closeForm, isOpenForm])


  // Закрытие формы при клике на область
  const closeOnBackDropClick = (evt: MouseEvent<HTMLElement>) => {
    if (evt.target === dialogRef.current) {
      if (idRef.current) idRef.current.value = '';
      closeForm()
    }
  }
  // Передача функции отправки формы на уровень выше с данными поля
  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    idRef.current && submitForm(idRef.current.value)
  }

  return (
      <dialog className={styles.dialog} ref={dialogRef} onMouseDown={(evt) => closeOnBackDropClick(evt)}>
        <form className={styles.form} onSubmit={e => handleSubmitForm(e)}>
          <label className={styles.field}>Введите номер контакта в формате 71234567890</label>
          <input className={styles.input} type="text" required ref={idRef} />
          <button className={styles.button}>Войти</button>
          <ErrorFrame text={errorText} />
          <span className={styles.close} onClick={closeForm}>X</span>
        </form>
      </dialog>
  )
}
