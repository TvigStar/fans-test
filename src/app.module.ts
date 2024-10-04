import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { dataBaseConfig } from './config/database.config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [SequelizeModule.forRoot(dataBaseConfig), AuthModule, UserModule],
})
export class AppModule {}
