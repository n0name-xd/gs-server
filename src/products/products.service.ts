import { Injectable } from '@nestjs/common';
import { SetProductDataDto, SetProductFileDto } from './dto/set-product.dto';

@Injectable()
export class ProductsService {
  async getAllProducts() {
    return [];
  }

  async setProduct(file: SetProductFileDto, data: SetProductDataDto) {
    const productData = {
      filePath: file.file[0].path,
      title: data.title,
      price: data.price,
      category: data.category,
      discount: data.discount,
      size: data.size,
      description: data.description,
    };

    return [productData];
  }
}
