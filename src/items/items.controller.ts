import { Get, Post, Body, Controller, UsePipes, Param, Put, Delete } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './item.interface';
import { ValidationPipe } from '../common/validation.pipe';
import { CreateItemDto } from './create-item.dto';


@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  async findAll(): Promise<Item[]> {
    return this.itemsService.findAll();
  }

  
  @Post()
  @UsePipes (new ValidationPipe())
  async create(@Body() createItemDto: CreateItemDto): Promise<Item> {
    return this.itemsService.create(createItemDto);

    
  } 

  @Get(':id')
  async getById(@Param('id') id: number): Promise<Item> {
    const item: Item = await this.itemsService.findOne(id);
    return item
  }

  // TODO
  @Delete(':id')
  remove(@Param('id') id: number) {
    return `Not yet implemented`;
  }


}