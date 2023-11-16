import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface IToken {
  userId: number;
  refreshToken: string;
}

@Table({ tableName: 'token' })
export class Token extends Model<Token, IToken> {
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;

  @Column({
    type: DataType.STRING,
    unique: false,
  })
  refreshToken: string;
}
