import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TasksModule } from "./tasks/tasks.module";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://mongodb:27017/todo-app";

@Module({
  imports: [MongooseModule.forRoot(MONGODB_URI), TasksModule],
})
export class AppModule {}
