export type Article = {
  id?: number
  title?: string
  categoryId?: number
  sourceUrl?: string
  publishedTime?: number
  originalThumb?: string
}

export type ArticleOptions = {
  title?: string
  showCount?: number
  isChange?: number
  articles: Article[]
}

export type IdArticles = {
  [propName: number]: Article
}
