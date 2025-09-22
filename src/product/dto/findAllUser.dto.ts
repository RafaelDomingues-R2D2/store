export class findAllProductDTO {
  constructor(
    readonly id: string,
    readonly userId: string,
    readonly name: string,
    readonly value: number,
    readonly quantity: number,
    readonly description: string,
    // readonly characteristics: { name: string; description: string }[],
    // readonly images: { url: string; description: string }[],
    readonly category: string,
  ) {}
}
