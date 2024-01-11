import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TopBanner } from 'src/topbaner/models/top-banner.model';

@Injectable()
export class FileService {
  constructor(
    @InjectModel(TopBanner)
    private topBannerModel: typeof TopBanner,
  ) {}

  async getAll(filePath: string) {
    const banners = await this.topBannerModel.findAll();

    const bannersList = {
      bannerOne: banners[0].linkBannerOne,
      bannerTwo: banners[0].linkBannerTwo,
      bannerThree: banners[0].linkBannerThree,
    };

    const result = Object.values(bannersList).filter((el) =>
      el.includes(filePath),
    )[0];

    return result;
  }
}
