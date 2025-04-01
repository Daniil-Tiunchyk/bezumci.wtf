import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { WeatherModule } from './weather/weather.module';
import { ExploitsModule } from './exploits/exploits.module';
import { ConfigModule } from '@nestjs/config';
import { SiteModule } from './site/site.module';
import { DelayMiddleware } from './delay.middleware';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    UsersModule,
    WeatherModule,
    ExploitsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SiteModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DelayMiddleware).forRoutes('*');
  }
}
