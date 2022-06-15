import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Blog } from './model/blog.model';

@Module({
  imports: [
    // connecting to the postgres
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pass123',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
    // Enables to use the blogRepository
    //Blog is the entity imported from models directory
    TypeOrmModule.forFeature([Blog]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
