import { IUserContact } from '../../models/requestData'
import styles from '../Chat/Chat.module.css'
import avatar from '../../assets/avatar.png'
import { useRef, KeyboardEvent, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchMessage } from '../../store/reducers/ActionCreators'

export default function Chat({ chatValues }: { chatValues: IUserContact }) {

  const inputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { messages, error } = useAppSelector(state => state.messages)
  const { userData } = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()

  // Отправка сообщений по клавише 'Enter'
  const sendMessage = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      dispatch(fetchMessage({
        apiTokenInstance: userData.apiTokenInstance,
        idInstance: userData.idInstance,
        chatId: chatValues.chatId,
        message: e.currentTarget.value
      }))
      e.currentTarget.value = '';
    }
  }

  // Скролл в нижнюю часть при новых сообщениях
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  return (
    <div className={styles.container}>
      {chatValues.chatId ?
        <>
          <div className={styles.header}>
            <img src={chatValues.avatar ? chatValues.avatar : avatar} className={styles.avatar} />
            <div className={styles.profile}>
              <p className={styles.profile__description}>{chatValues.name}</p>
              <p className={styles.profile__description}>{chatValues.chatId}</p>
            </div>
          </div>
          <div className={styles.window}>
            <div className={styles.chat}>
              {messages.map((message) =>
                <article className={`${styles.message} ${message.incoming && styles.message_type_incoming}`}
                 key={message.idMessage}>
                  {message.message}
                </article>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className={styles.footer}>
              <input className={styles.input} ref={inputRef}
                onKeyDown={(e) => sendMessage(e)} />
              {error.isError && <div className={styles.slider}>
                {error.message}
              </div>}
            </div>

          </div>
        </>
        :
        <h1 className={styles.title}>
          <span className={styles.image} />
          Создайте новый чат
        </h1>
      }

    </div>
  )
}