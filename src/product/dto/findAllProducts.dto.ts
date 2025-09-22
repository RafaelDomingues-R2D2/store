class FindAllProductCharacteristicDTO {
  name: string;
  description: string;
}

class FindAllProductImageticsDTO {
  url: string;
  description: string;
}

export class FindAllProductsDTO {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly characteristics: FindAllProductCharacteristicDTO[],
    readonly images: FindAllProductImageticsDTO[],
  ) {}
}
