import { SetMetadata } from '@nestjs/common';

export enum Role {
  User = 'User',
  Admin = 'Admin',
}
export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
