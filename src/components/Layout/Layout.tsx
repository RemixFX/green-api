import { useState } from 'react'
import Chat from '../Chat/Chat'
import Contacts from '../Contacts/Contacts'
import styles from './Layout.module.css'
import { IUserContact } from '../../models/requestData'

export default function Layout () {

  const [chatValues, setChatValues] = useState<IUserContact>({
    name: '',
    avatar: '',
    chatId: '',
  })

  const startChat = (values: IUserContact) => {
    console.log(values)
    setChatValues({
      name: values.name,
      avatar: values.avatar,
      chatId: values.chatId
    })
  }
console.log(chatValues)
  return (
    <div className={styles.container}>
      <Contacts startChat={startChat}/>
      <Chat chatValues={chatValues}/>
    </div>
  )
}