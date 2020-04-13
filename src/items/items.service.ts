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
 
    /**
    * findAll
    * @return an array with all the Items
    * */
    async findAll(): Promise<Item[]> {
        return this.itemsRepository.find();
    }

    /**
    * findOne 
    * @param a number
    * @return an Item
    * */
    async findOne(id: number): Promise<Item> {
        return this.itemsRepository.findOne(id);
    } 

    /**
    * createItem 
    * @param an Item
    * @return an Item
    * */
    async createItem(item: Item): Promise<Item> {
       return this.itemsRepository.save(item);
    }

}