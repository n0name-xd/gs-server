export class SetProductFileDto {
  readonly [key: string]: Array<{
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
  }>;
}

export class SetProductDataDto {
  readonly title: string;
  readonly price: number;
  readonly category: string;
  readonly discount: number;
  readonly size: string;
  readonly description: string;
}
