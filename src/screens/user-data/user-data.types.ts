export interface IUserDataValues {
  email: string;
  nickname: string;
  password: string;
  _id: string;
}

export interface IProps {
  initialValues?: Partial<IUserDataValues>;
}
