import { MongooseModuleAsyncOptions } from '@nestjs/mongoose'
import { ConfigService } from '@nestjs/config'

export function getMongooseOptions(): MongooseModuleAsyncOptions {
  return {
    async useFactory(config: ConfigService) {
      return {
        uri: config.get<string>('db.mongoUrl')
      }
    },
    inject: [ConfigService],
  }
}
