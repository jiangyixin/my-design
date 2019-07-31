export type SmartCourseListOption = {
  title: string;
  subTitle: string;
  type: string;
  showType: string;
  showCount?: number;
  category?: number;
  order?: string;
  courseIds?: Array<number>;
  isMore: Boolean;
}
