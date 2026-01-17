export interface IUserDataValues {
  email: string;
  nickname: string;
  rooms: string[];
  role: string;
  public_id: string;
  _id: string;
}

export interface IPostUserData {
  email: string;
  nickname: string;
}

export interface IProps {
  initialValues?: Partial<IUserDataValues>;
}
