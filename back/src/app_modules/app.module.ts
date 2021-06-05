import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from 'src/shared_modules/services/config.service';
import { SharedModule } from 'src/shared_modules/shared.module';
import { AuthModule } from './auth/auth.module';
import { BoardModule } from './board/board.module';
import { ChannelModule } from './channel/channel.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [
        SharedModule , 
        // AuthModule,
        UserModule,
        ChannelModule,
        BoardModule
      ],
      useFactory: (configService: ConfigService) => configService.typeOrmConfig,
      inject: [ConfigService],
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
