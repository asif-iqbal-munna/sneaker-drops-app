export interface IDrop {
  id: number;
  uuid: string;
  name: string;
  price: number;
  total_stock: number;
  available_stock: number;
  drops_date?: Date | null;
  status: "draft" | "scheduled" | "live" | "cancelled";

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
      payload: { dropId: number; available: number };
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
    