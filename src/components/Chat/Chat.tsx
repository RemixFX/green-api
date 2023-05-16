import styles from './Chat.module.css'

export default function Chat() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span className={styles.image} />
        Создайте новый чат
      </h1>
    </div>
  )
}