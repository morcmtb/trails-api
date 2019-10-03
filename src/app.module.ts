import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrailsService } from './trails/trails.service';
import { TrailsController } from './trails/trails.controller';
import { DatabaseModule } from './database/database.module';
import { TrailsModule } from './trails/trails.module';

@Module({
  imports: [DatabaseModule, TrailsModule],
  controllers: [AppController, TrailsController],
  providers: [AppService, TrailsService],
})
export class AppModule {}
