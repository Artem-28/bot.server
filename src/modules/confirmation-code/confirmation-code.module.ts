import { Module } from '@nestjs/common';
import { ConfirmationCodeController } from './confirmation-code.controller';
import { ConfirmationCodeService } from './confirmation-code.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailingModule } from '../mailing/mailing.module';
import { MailingService } from '../mailing/mailing.service';
import { ConfirmationCodes } from './confirmation-code.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ConfirmationCodes]), MailingModule],
  controllers: [ConfirmationCodeController],
  providers: [ConfirmationCodeService, MailingService],
})
export class ConfirmationCodeModule {}