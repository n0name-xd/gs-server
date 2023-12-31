import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface TopBannerAttrs {
  id: number;
  linkBannerOne: string;
  linkBannerTwo: string;
  linkBannerThree: string;
}

@Table({ tableName: 'top-banner' })
export class TopBanner extends Model<TopBanner, TopBannerAttrs> {
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
  linkBannerOne: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  linkBannerTwo: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  linkBannerThree: string;
}
