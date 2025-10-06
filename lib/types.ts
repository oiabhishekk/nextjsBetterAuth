export type ActionResponse<T = undefined> =
  | {
    status: "success";
    message: string;
    data: T;
  }
  | {
    status: "error";
    message: string;
    errors?: Record<string, string[]>;
  };
