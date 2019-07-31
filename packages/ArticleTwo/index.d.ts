export type Article = {
  id?: number
  title?: string
  categoryId?: number
  sourceUrl?: string
  publishedTime?: number
  originalThumb?: string
  hits?: number
}

export type ArticleOptions = {
  title?: string
  isMore?: number,
  articles: Article[]
}

export type IdArticles = {
  [propName: number]: Article
}
