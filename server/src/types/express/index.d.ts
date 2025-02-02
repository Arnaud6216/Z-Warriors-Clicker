// to make the file a module and avoid the TypeScript error
export type { Account, Ennemy, Progress };

declare global {
  namespace Express {
    export interface Request {
      /* ************************************************************************* */
      // Add your custom properties here, for example:
      //
      // user?: { ... }
      /* ************************************************************************* */
    }
  }
}

type Account = {
  id: number;
  username: string;
  email: string;
  hashed_password: string;
};

type Ennemy = {
  id: number;
  name: string;
  img_src: string;
  life: number;
};

type Progress = {
  account_id: number;
  ennemy_id: number;
};
