import UserType from './UserType';

type ResponseSignup = {
  success: boolean;
  message: string;
  data?: UserType & { id: string };
};

export default ResponseSignup;
