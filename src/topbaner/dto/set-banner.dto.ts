export class SetBannersDto {
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
