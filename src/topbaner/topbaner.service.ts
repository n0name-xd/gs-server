import { Injectable } from '@nestjs/common';
import { SetBannersDto } from './dto/set-banner.dto';
import { InjectModel } from '@nestjs/sequelize';
import { TopBanner } from './models/top-banner.model';

@Injectable()
export class TopbanerService {
  constructor(
    @InjectModel(TopBanner)
    private topBannerModel: typeof TopBanner,
  ) {}

  async setBanners(files: SetBannersDto) {
    try {
      const bannerList = await this.topBannerModel.findAll();
      console.log('bannerList', bannerList);
      if (!bannerList) {
        await this.topBannerModel.create({
          id: 1,
          linkBannerOne: files.bannerOne[0].path,
          linkBannerTwo: files.bannerTwo[0].path,
          linkBannerThree: files.bannerThree[0].path,
        });
      }
      return 'success';
    } catch (err) {
      console.log(err);
    }
  }

  async getAll() {
    return this.topBannerModel.findAll();
  }
}
