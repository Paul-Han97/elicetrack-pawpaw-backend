export class UploadImageDto {
  entity: {
    id: number;
    name: string;
  };
  imageList: Express.Multer.File[];

  constructor() {
    this.entity = { id: 0, name: '' };
    this.imageList = [];
  }
}

export class UploadImageResponseDto {
  imageList: { filename: string; url: string; ext: string }[];

  constructor() {
    this.imageList = [];
  }
}
