import { Injectable } from '@nestjs/common';
import { Item } from './item.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ItemsService {
    constructor(
        @InjectRepository(Item)
        private itemsRepository: Repository<Item>,
    ){}
 
    //findAll returns an array with all the items
    async findAll(): Promise<Item[]> {
        const allItem: Item[] = await this.itemsRepository.find();
        return allItem;
    }

    //findOne returns an item
    //findOne take an item id as an argument
    async findOne(id: number): Promise<Item>{
        const item: Item = await this.itemsRepository.findOne(id);
        return item;
    } 

    //TODO => avoid the creation of the same item with multiple ids

    //createItem saves a new item in the database
    //createItem takes an item as an argument
    async createItem(item: Item): Promise<Item>{
        await this.itemsRepository.save(item);
        return item;
    }

}