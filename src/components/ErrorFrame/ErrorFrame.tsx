import styles from '../ErrorFrame/ErrorFrame.module.css'

export default function ErrorFrame ({text}: {text: string}) {
  return (
    <div className={`${styles.frame} ${text && styles.frame_open}`}>
      <p className={styles.notice}>{text}</p>
    </div>
  )
}