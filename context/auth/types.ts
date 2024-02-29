export type AuthUserType = null | Record<string, any>;
export type ActionMapType<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};
export type AuthStateType = {
  status?: string;
  loading: boolean;
  user: AuthUserType;
};
export type AuthContextType = {
  login?: (email: string, password: string) => Promise<void>;
  register?: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) => Promise<void>;
  //
  loginWithGoogle?: () => Promise<void>;
  loginWithGithub?: () => Promise<void>;
  loginWithTwitter?: () => Promise<void>;

  //
  confirmRegister?: (email: string, code: string) => Promise<void>;
  forgotPassword?: (email: string) => Promise<void>;
  resendCodeRegister?: (email: string) => Promise<void>;
  newPassword?: (
    email: string,
    code: string,
    password: string,
  ) => Promise<void>;
  user: AuthUserType;
  loading: boolean;
  authenticated: boolean;
  unauthenticated: boolean;
  logout?: () => Promise<void>;
};

export enum Types {
  INITIAL = "INITIAL",
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  LOGOUT = "LOGOUT",
}

export type Payload = {
  [Types.INITIAL]: {
    user: AuthUserType;
  };
  [Types.LOGIN]: {
    user: AuthUserType;
  };
  [Types.REGISTER]: {
    user: AuthUserType;
  };
  [Types.LOGOUT]: undefined;
};

export type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];
