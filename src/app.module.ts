import {
  MiddlewareConsumer,
  Module,
  OnModuleInit,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import authConfig from '../configs/auth.config';
import { DatabaseModule } from 'configs/database.module';
import { JwtMiddleware } from './middlewares/jwt.middleware';
import { JwtModule } from '@nestjs/jwt';
import { ToolModule } from './models/tools/tool.module';
import { ToolController } from './models/tools/tool.controller';
import { DetailToolController } from './models/detailTools/detailTool.controller';
import { DetailToolModule } from './models/detailTools/detailTool.module';
import { ProjectController } from './models/projects/project.controller';
import { ProjectModule } from './models/projects/project.module';
import { AuthController } from './models/auth/auth.controller';
import { AuthModule } from './models/auth/auth.module';
import { UserController } from './models/users/user.controller';
import { UserModule } from './models/users/user.module';
import { ManagementModule } from './models/managements/manager.module';
import { ManagementController } from './models/managements/manager.controller';
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [authConfig],
    }),
    DatabaseModule,
    ToolModule,
    DetailToolModule,
    ProjectModule,
    AuthModule,
    UserModule,
    ManagementModule,
  ],
  controllers: [
    AppController,
    ToolController,
    DetailToolController,
    ProjectController,
    AuthController,
    UserController,
    ManagementController,
  ],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
