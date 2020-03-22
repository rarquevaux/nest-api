import { Module } from '@nestjs/common';
import { ItemsController } from './items/items.controller';
import { ItemsService } from './items/items.service';
import { ShoppingCartController } from './shopping-cart/shopping-cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './items/item.interface';
//import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // TO DO -> use ConfigModule to pass config
    // ConfigModule exposes a ConfigService wich loads the .env file
    //ConfigModule.forRoot(),
    // TO DO -> create an ormconfig.json file
    TypeOrmModule.forRoot({
      type: "postgres",
      host: 'postgres',
      port: 5432,
      username: 'admin',
      password: 'nesta',
      database: 'items',
      entities: [Item],
      synchronize: true,

    }),
  ],
  controllers: [ItemsController, ShoppingCartController],
  providers: [ItemsService],
})

export class AppModule {}
