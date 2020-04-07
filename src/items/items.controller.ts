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

  //TO DO - protect the put and delete methods

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `Not yet implemented`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `Not yet implemented`;
  }


}