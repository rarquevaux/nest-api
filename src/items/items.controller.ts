import { 
  Get,
  Post, 
  Body, 
  Controller, 
  UsePipes, 
  Param, 
  Put, 
  Delete,
  NotFoundException,
  BadRequestException,
  UseGuards,
 } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './item.interface';
import { ValidationPipe } from '../common/validation.pipe';
import { CreateItemDto } from './create-item.dto';
import { AuthGuard } from '@nestjs/passport'


@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  async findAll(): Promise<Item[]> {
    return this.itemsService.findAll();
  }

  
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @UsePipes (new ValidationPipe())
  async create(@Body() createItemDto: CreateItemDto): Promise<Item> {
    return this.itemsService.createItem(createItemDto);

    
  } 

  @Get(':id')
  async getById(@Param('id') id: number): Promise<Item> {
    const itemInfo = await this.itemsService.findOne(id);
    if(!itemInfo){
      throw new NotFoundException(`Item with id ${id} not found`);
    }
    return itemInfo
  }

  // TODO
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param('id') id: number) {
    //this.itemsService.delete(id);
    throw new BadRequestException();
  }


}