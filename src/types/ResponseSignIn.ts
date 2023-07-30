export type LoginResponseDTO = {
  id: string;
  email: string;
};

type ResponseSignIn = {
  success: boolean;
  message: string;
  data?: LoginResponseDTO;
};

export default ResponseSignIn;
