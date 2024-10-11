import { IsEnum, IsOptional } from 'class-validator';
import { PaginationDto } from 'src/commons';
import { OrderStatus, OrderStatusList } from '../enum/order.enum';

export class OrderPaginationDTO extends PaginationDto {
  @IsOptional()
  @IsEnum(OrderStatusList, {
    message: `Possible status values are ${OrderStatusList}`,
  })
  status: OrderStatus;
}
