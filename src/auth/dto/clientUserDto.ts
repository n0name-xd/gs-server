import { User } from 'src/users/models/user.model';

export class ClientUserDto {
  email: string;
  id: number;
  isActivated: boolean;

  constructor(model: User) {
    this.email = model.email;
    this.id = model.id;
    this.isActivated = model.isActivated;
  }
}
