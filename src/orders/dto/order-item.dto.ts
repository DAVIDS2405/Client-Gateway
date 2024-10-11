import { IsNumber, IsPositive } from 'class-validator';

export class OrdenItemDTO {
  @IsPositive()
  @IsNumber()
  productId: number;
  @IsPositive()
  @IsNumber()
  quantity: number;
  @IsPositive()
  @IsNumber()
  price: number;
}
