import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './blog/blog.module';
import { UserModule } from './user/user.module';
import 'dotenv/config';

@Module({
  imports: [
    BlogModule,
    UserModule,
    // connecting to the postgres
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.host_name,
      port: parseInt(process.env.port),
      username: process.env.pg_username,
      password: process.env.pg_password,
      database: process.env.database,
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
