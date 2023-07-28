import UserType from './UserType';

type ReturnCreate = {
  success: boolean;
  message: string;
  data?: UserType & { id: string };
};

export default ReturnCreate;
