import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/commons';
import { NATS_SERVICE } from 'src/config';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  async createProduct(@Body() body: CreateProductDto) {
    try {
      const newProduct = await firstValueFrom(
        this.client.send({ cmd: 'create_product' }, body),
      );
      return newProduct;
    } catch (error) {
      throw new RpcException(error);
    }
  }
  @Get()
  findAllProduct(@Query() paginationDto: PaginationDto) {
    return this.client.send({ cmd: 'find_all_products' }, paginationDto);
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    // return this.productsClient.send({ cmd: 'find_one_product' }, { id })
    // .pipe(
    //   catchError(error => {throw new RpcException(error)})
    // )
    try {
      const product = await firstValueFrom(
        this.client.send({ cmd: 'find_one_product' }, { id }),
      );
      return product;
    } catch (error) {
      throw new RpcException(error);
    }
  }
  @Patch(':id')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateProductDto,
  ) {
    try {
      const product = await firstValueFrom(
        this.client.send({ cmd: 'update_product' }, { id, ...body }),
      );
      return product;
    } catch (error) {
      throw new RpcException(error);
    }
  }
  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    try {
      const product = await firstValueFrom(
        this.client.send({ cmd: 'delete_product' }, { id }),
      );
      return product;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
