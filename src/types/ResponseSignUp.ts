import UserType from './UserType';

type ResponseSignUp = {
  success: boolean;
  message: string;
  data?: UserType & { id: string };
};

export default ResponseSignUp;
