export type selectedUserType = {
    id: number;
    userName: string;
    email: string;
    avatar: string;
    first_name: string;
    last_name: string;
};

export type hoverState = {
  value: boolean;
  id: null | number | undefined;
};

export type modelStateType = {
  value: boolean;
  type: string;
};

export type FormData = {
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
};