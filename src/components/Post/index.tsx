import { 
  type ChangeEvent,
  type FormEvent,
  type InvalidEvent,
  useState
} from 'react'
import { format, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'

import { Avatar } from '../Avatar'
import styles from './Post.module.css'
import { Comment } from './SubComponents/Comment'

interface Author {
  name: string
  role: string
  avatarUrl: string
}

interface Content {
  type: string
  content: string
}

interface PostProps {
  author: Author
  content: Content[]
  publishedAt: Date
}

export function Post({ author, content, publishedAt }: PostProps) {
  const [comments, setComments] = useState([ 'Post muito bom!!!' ])
  const [newCommentText, setNewCommentText] = useState('')
  const formattedDate = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR
  })

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  })

  const handleNewCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.target.setCustomValidity('')
    setNewCommentText(e.target.value)
  }

  const handleCreateNewComment = (e: FormEvent) => {
    e.preventDefault()

    setComments([ ...comments, newCommentText ])
    setNewCommentText('')
  }

  const deleteComment = (commentToDelete: string) => {
    const commentsWithoutDeletedOne = comments.filter(comment => comment !== commentToDelete)
    setComments(commentsWithoutDeletedOne)
  }

  const handleNewCommentInvalid = (e: InvalidEvent<HTMLTextAreaElement>) => {
    e.target.setCustomValidity('Esse campo é obrigatório!')
  }

  const isNewCommentEmpty = newCommentText.length === 0

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time title={formattedDate} dateTime={publishedAt.toISOString()}>
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map(item => {
          if (item.type === 'paragraph') {
            return <p key={item.content}>{item.content}</p>
          // biome-ignore lint/style/noUselessElse: <explanation>
          } else if (item.type === 'link') {
            return <p key={item.content}><a href='./'>{item.content}</a></p>
          }
        })}
      </div>
      
      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
      
        <textarea
          id='comment'
          name='comment'
          placeholder='Deixe um comentário'
          value={newCommentText}
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid}
          required
        />

        <footer>
          <button type='submit' disabled={isNewCommentEmpty}>
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map(comment => {
          return <Comment
            key={comment}
            content={comment}
            onDeleteComment={deleteComment}
          />
        })}
      </div>
    </article>
  )
}