interface Author {
  name: string
  role: string
  avatarUrl: string
}

interface Content {
  type: 'paragraph' | 'link'
  content: string
}

interface PostsType {
  id?: number
  author: Author
  content: Content[]
  publishedAt: Date
}