// Types from prisma
export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  country: string;
  gender: string;
};

export enum NotificationType {
  normal = "normal",
  form = "form",
}

export type CustomNotification = {
  id: number;
  title: string;
  description: string;
  type: NotificationType;
  read: boolean;
};