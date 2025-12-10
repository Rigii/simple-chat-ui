export interface IUserDataValues {
  email: string;
  nickname: string;
  password: string;
  _id: string;
}

export interface IPostUserData {
  email: string;
  nickname: string;
  password: string;
}

export interface IProps {
  initialValues?: Partial<IUserDataValues>;
}
