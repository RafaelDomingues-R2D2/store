export class FindAllOrdersDTO {
  constructor(
    readonly id: string,
    readonly userId: string,
    readonly totalValue: number,
    readonly status: string,
  ) {}
}
