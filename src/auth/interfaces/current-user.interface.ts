import { StringSchema } from 'joi';

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
}
