import {
  CacheModule,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';

import { LoggerMiddleware } from './middlewares/logger.middleware';
import { ConfigModule } from '@nestjs/config';
import { GistService } from './domains/gist/gist.service';
import { GistController } from './domains/gist/gist.controller';
import { GistModule } from './domains/gist/gist.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'postgres',
    //     host: configService.get('DB_URL'),
    //     port: +configService.get<number>('DB_PORT'),
    //     username: configService.get('DB_USER_NAME'),
    //     password: configService.get('DB_PASSWORD'),
    //     database: configService.get('DB_NAME'),
    //     entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //     synchronize: true,
    //     autoLoadEntities: true,
    //   }),
    //   inject: [ConfigService],
    // }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `env/${process.env.NODE_ENV || 'development'}.env`,
    }),
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,
      ttl: 60 * 60 * 24, // 1 day
    }),
    HttpModule,
    GistModule,
  ],
  controllers: [GistController],
  providers: [GistService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: 'api/v1/common/getIdToken', method: RequestMethod.POST })
      .forRoutes('*');
  }
}
