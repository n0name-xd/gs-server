import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface UserCreationAttrs {
  id: number;
  email: string;
  password: string;
  isActivated: boolean;
  name: string;
  activationLink: string;
}

@Table({ tableName: 'user' })
export class User extends Model<User, UserCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

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
    defaultValue: false,
  })
  isActivated: boolean;

  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
  })
  activationLink: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  userName: string;
}
