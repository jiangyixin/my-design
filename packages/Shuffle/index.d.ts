export type JumpUrl = {
  target?: string
  params?: {
    url?: string
    courseId?: number
    lessonId?: number
  }
}
export type Shuffle = {
  picture?: string
  jumpUrl?: JumpUrl
}

export type ShuffleOptions = {
  title?: string
  pictureList: Shuffle[]
}
