import { Injectable } from '@nestjs/common';
import { SetBannersDto } from './dto/set-banner.dto';
import { InjectModel } from '@nestjs/sequelize';
import { TopBanner } from './models/top-banner.model';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class TopbanerService {
  constructor(
    @InjectModel(TopBanner)
    private topBannerModel: typeof TopBanner,
  ) {}

  async setBanners(files: SetBannersDto) {
    try {
      const bannerList = await this.topBannerModel.findAll();

      const newBannersData = {
        id: 1,
        linkBannerOne: files?.bannerOne
          ? path.resolve(files.bannerOne[0]?.path)
          : bannerList[0].linkBannerOne || '',
        linkBannerTwo: files?.bannerTwo
          ? path.resolve(files.bannerTwo[0].path)
          : bannerList[0].linkBannerTwo || '',
        linkBannerThree: files?.bannerThree
          ? path.resolve(files.bannerThree[0].path)
          : bannerList[0].linkBannerThree || '',
      };

      if (bannerList.length === 0) {
        await this.topBannerModel.create({
          ...newBannersData,
        });

        return 'The banner has been successfully installed';
      } else {
        const bannerData = await this.topBannerModel.findOne({
          where: { id: 1 },
        });

        const oldLink = {
          linkBannerOne: bannerData.linkBannerOne,
          linkBannerTwo: bannerData.linkBannerTwo,
          linkBannerThree: bannerData.linkBannerThree,
        };

        bannerData.set({
          ...newBannersData,
        });

        await bannerData.save();

        const deleteFile = (pathLink: string): void => {
          const normalizeFilePath = path.normalize(pathLink);

          fs.unlink(normalizeFilePath, () =>
            console.log(`File ${normalizeFilePath} successful deleted`),
          );
        };

        if (bannerData.linkBannerOne) {
          deleteFile(oldLink.linkBannerOne);
        }

        if (bannerData.linkBannerTwo) {
          deleteFile(oldLink.linkBannerTwo);
        }

        if (bannerData.linkBannerThree) {
          deleteFile(oldLink.linkBannerThree);
        }

        return 'The banner has been successfully updated';
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getAll() {
    const banners = await this.topBannerModel.findAll();

    return banners;
  }
}
