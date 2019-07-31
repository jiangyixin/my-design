
export type JumpUrl = {
  target?: string
  params?: {
    url?: string
    courseId?: number
    lessonId?: number
  }
}

export type ImageOptions = {
  title?: string
  picture?: string
  jumpUrl?: JumpUrl
  margin?: number,
  borderRadius?: number,
}
