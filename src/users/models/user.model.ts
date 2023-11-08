import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface UserCreationAttrs {
  name: string;
}

@Table
export class User extends Model<User, UserCreationAttrs> {
  @Column({ type: DataType.STRING, unique: false })
  name: string;
}
