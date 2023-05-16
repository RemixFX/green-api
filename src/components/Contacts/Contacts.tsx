import styles from './Contacts.module.css'
import avatar from '../../assets/avatar.png'
import { useAppSelector } from '../../store/hooks'

export default function Contacts() {

  const { contacts, error, loading } = useAppSelector(state => state.contacts)

  return (
    <div className={styles.contacts}>
      {contacts.map((element, index) =>
        <article className={styles.element} key={index}>
          <div className={styles.container}>
            <p className={styles.record}>{element.name}</p>
            <p className={styles.record}>{element.chatId}</p>
          </div>
          <img src={element.avatar ? element.avatar : avatar} className={styles.images} />
        </article>
      )}
      <article className={`${styles.element} ${styles.element_type_last}`}></article>

    </div>
  )
}