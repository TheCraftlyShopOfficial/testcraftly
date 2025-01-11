interface userDataToBeRegistered {
  name: string;
  email: string;
  phone: number | string;
  password: string;
}

interface userDataToBeLogin {
  phone: number | string;
  password: string;
}

export type { userDataToBeRegistered, userDataToBeLogin };
