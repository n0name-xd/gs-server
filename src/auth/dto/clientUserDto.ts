import { User } from 'src/users/models/user.model';

export class ClientUserDto {
  readonly email: string;
  readonly id: number;
  readonly isActivated: boolean;

  constructor(model: User) {
    this.email = model.email;
    this.id = model.id;
    this.isActivated = model.isActivated;
  }
}
