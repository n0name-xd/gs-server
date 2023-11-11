import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface UserCreationAttrs {
  email: string;
  password: string;
  isActivated: boolean;
  name: string;
  activationLink: string;
}

@Table
export class User extends Model<User, UserCreationAttrs> {
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.BOOLEAN,
    unique: false,
    allowNull: false,
  })
  isActivated: boolean;

  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
    defaultValue: false,
  })
  activationLink: string;

  @Column({
    type: DataType.STRING,
  })
  userName: string;
}
