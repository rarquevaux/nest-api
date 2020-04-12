import { Module } from '@nestjs/common';
import { ShoppingCartController } from './shopping-cart/shopping-cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsModule } from './items/items.module';
import { Item } from './items/item.entity';
import { AuthzModule } from './authz/authz.module';

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
    ItemsModule,
    AuthzModule,
  ],
  controllers: [ShoppingCartController],
  providers: [],
})

export class AppModule {}
