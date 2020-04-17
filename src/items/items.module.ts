import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { Item } from './item.entity';
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
    imports: [
        // TO DO use a custom provider to fetch the configuration from a service 
        ClientsModule.register([
            {
                name: "ms-data-sharing",
                transport: Transport.TCP,
                options: {
                      host: "127.0.0.1",
                      port: 3001
                    }
                }
            ]),
        TypeOrmModule.forFeature([Item])],
    providers: [ItemsService],
    controllers: [ItemsController],
})
export class ItemsModule {}
