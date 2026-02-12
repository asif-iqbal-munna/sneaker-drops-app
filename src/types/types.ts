export interface IDrop {
  id: number;
  uuid: string;
  name: string;
  price: number;
  total_stock: number;
  available_stock: number;
  drops_date?: Date | null;
  status: "draft" | "scheduled" | "live" | "cancelled";

  Purchases?: IPurchase[],

  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPurchase {
  id?: number;
  uuid?: string;
  drop_id: number;
  user_id: number;
  User?: IUser

  createdAt?: Date;
  updatedAt?: Date;
}

export interface IReservation {
  id: number;
  uuid: string;
  user_id: string;
  drop_id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUser {
  id: number;
  uuid: string;
  username: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type DropEvent =
  | {
      type: "drop";
      payload: IDrop;
    }
  | {
      type: "stock";
      payload: { dropId: number; userId: number; available: number };
    }
  | {
      type: "purchase";
      payload: { dropId: number; username: string };
    };

export type PromiseProps<T> = {
  data: T[],
  success: boolean,
  message: string
} 
    