import { useState } from 'react'
import { ThumbsUp, Trash } from 'phosphor-react'
import styles from './Comment.module.css'
import { Avatar } from '../../../Avatar'

interface CommentProps {
  content: string
  onDeleteComment: (comment: string) => void
}

export function Comment({ content, onDeleteComment }: CommentProps) {
  const [likeCount, setLikeCount] = useState(0)

  const handleClickComment = () => {
    onDeleteComment(content)
  }

  const handleLikeComment = () => {
    setLikeCount((prevState) => {
      return prevState + 1
    })
  }

  return (
    <div className={styles.comment}>
      <Avatar src='https://github.com/GuilhermeAG015.png' hasBorder={false} />
      
      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Guilherme Alexandre</strong>
              <time title='03 de Março às 8:13h' dateTime='2025-03-03 08:13:30'>Cerca de 1h atrás</time>
            </div>

            <button onClick={handleClickComment} title="Deletar comentário" type='button'>
              <Trash size={24} />
            </button>
          </header>
          <p>{content}</p>
        </div>

        <footer>
          <button 
            type='button'
            onClick={handleLikeComment}
          >
            <ThumbsUp />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  )
}