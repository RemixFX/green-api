import Chat from '../Chat/Chat'
import Contacts from '../Contacts/Contacts'
import styles from './Layout.module.css'

export default function Layout () {
  return (
    <div className={styles.container}>
      <Contacts/>
      <Chat/>
    </div>
  )
}