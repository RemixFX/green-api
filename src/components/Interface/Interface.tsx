import { useState } from 'react'
import Chat from '../Chat/Chat'
import Contacts from '../Contacts/Contacts'
import styles from '../Interface/Interface.module.css'
import { IUserContact } from '../../models/requestData'

export default function Interface () {

  const [chatValues, setChatValues] = useState<IUserContact>({
    name: '',
    avatar: '',
    chatId: '',
  })

  const startChat = (values: IUserContact) => {
    setChatValues({
      name: values.name,
      avatar: values.avatar,
      chatId: values.chatId
    })
  }

  return (
    <div className={styles.container}>
      <Contacts startChat={startChat}/>
      <Chat chatValues={chatValues}/>
    </div>
  )
}