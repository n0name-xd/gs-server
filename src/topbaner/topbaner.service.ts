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
      const newBannersData = {
        id: 1,
        linkBannerOne: files.bannerOne[0].path,
        linkBannerTwo: files.bannerTwo[0].path,
        linkBannerThree: files.bannerThree[0].path,
      };

      const bannerList = await this.topBannerModel.findAll();

      if (bannerList.length === 0) {
        await this.topBannerModel.create({
          ...newBannersData,
        });

        return 'The banner has been successfully installed';
      } else {
        const bannerData = await this.topBannerModel.findOne({
          where: { id: 1 },
        });
        bannerData.set({
          ...newBannersData,
        });

        await bannerData.save();
        return 'The banner has been successfully updated';
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getAll() {
    return this.topBannerModel.findAll();
  }
}
