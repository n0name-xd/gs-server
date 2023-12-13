import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface ITokenAtrr {
  userId: number;
  refreshToken: string;
}

@Table({ tableName: 'token' })
export class Token extends Model<Token, ITokenAtrr> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    allowNull: false,
    primaryKey: true,
  })
  userId: number;

  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
  })
  refreshToken: string;
}
