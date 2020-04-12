import { Test, TestingModule } from '@nestjs/testing';
import { ItemsService } from './items.service';
import { Item } from './item.interface';
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";

describe("-- Items Service --", () => {
    let itemService: ItemsService;
    let module: TestingModule;
    let itemRepositoryMock: MockType<Repository<Item>>;
    const mockNumberToSatisfyParameters = 0;

    beforeAll(async () => {
      module = await Test.createTestingModule({
        providers: [
          ItemsService,
          { provide: getRepositoryToken(Item), useFactory: repositoryMockFactory },
        ]
     }).compile();

     itemService = module.get<ItemsService>(ItemsService);
     itemRepositoryMock = module.get(getRepositoryToken(Item));
    });

    describe('createItem', () => {
        it('should save an item in the database', async () => {
          const params = {
            name: 'name',
            price: 6,
          };
    
          itemRepositoryMock.save = jest.fn();
          await itemService.createItem(params);
    
          expect(itemRepositoryMock.save).toHaveBeenCalledWith(
            Object.assign(new Item(), params),
          );
        });
      });

});



// @ts-ignore
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
    findOne: jest.fn(),
    find: jest.fn(),
    save: jest.fn()
   }));
export type MockType<T> = {
    [P in keyof T]: jest.Mock<{}>;
};