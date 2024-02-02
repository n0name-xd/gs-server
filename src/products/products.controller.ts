import {
  Controller,
  Get,
  Post,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express/multer';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { SetProductDataDto, SetProductFileDto } from './dto/set-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async getAllProducts() {
    return this.productsService.getAllProducts();
  }

  @Post('product')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'file', maxCount: 1 }], {
      storage: diskStorage({
        destination: './files/products',
        filename: (_, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;

          callback(null, filename);
        },
      }),
    }),
  )
  async setProduct(
    @UploadedFiles()
    file: SetProductFileDto,
    @Req() req,
  ) {
    const data = {
      title: req.body.title,
      price: req.body.price,
      category: req.body.category,
      discount: req.body.discount,
      size: req.body.size,
      description: req.body.description,
    } as SetProductDataDto;

    return this.productsService.setProduct(file, data);
  }
}
