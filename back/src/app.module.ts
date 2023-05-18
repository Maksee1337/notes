import {Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import * as process from "process";
import {AuthModule} from "./modules/auth/auth.module";
import { UserController } from './modules/user/user.controller';
import { UserModule } from './modules/user/user.module';
import {User} from "./entities/user.entity";
import {Note} from "./entities/note.entity";
import { NoteModule } from './modules/note/note.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: parseInt(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            entities: [User, Note],
            synchronize: true,
            logging: true,
        }),
        AuthModule,
        UserModule,
        NoteModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
