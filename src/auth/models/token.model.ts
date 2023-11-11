import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface IToken {
  user: number;
  refreshToken: string;
}

@Table
export class Token extends Model<Token, IToken> {
  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  user: number;

  @Column({
    type: DataType.STRING,
    unique: false,
  })
  refreshToken: string;
}
