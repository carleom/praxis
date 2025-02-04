import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsModule } from '../comments/comments.module';
import { GroupsModule } from '../groups/groups.module';
import { ImagesModule } from '../images/images.module';
import { PubSubModule } from '../pub-sub/pub-sub.module';
import { VotesModule } from '../votes/votes.module';
import { ProposalConfig } from './models/proposal-config.model';
import { Proposal } from './models/proposal.model';
import { ProposalActionEventsModule } from './proposal-actions/proposal-action-events/proposal-action-events.module';
import { ProposalActionGroupConfigsModule } from './proposal-actions/proposal-action-group-configs/proposal-action-group-configs.module';
import { ProposalActionRolesModule } from './proposal-actions/proposal-action-roles/proposal-action-roles.module';
import { ProposalActionsModule } from './proposal-actions/proposal-actions.module';
import { ProposalsResolver } from './proposals.resolver';
import { ProposalsService } from './proposals.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Proposal, ProposalConfig]),
    forwardRef(() => CommentsModule),
    forwardRef(() => ImagesModule),
    forwardRef(() => ProposalActionsModule),
    forwardRef(() => VotesModule),
    forwardRef(() => GroupsModule),
    ProposalActionEventsModule,
    ProposalActionGroupConfigsModule,
    ProposalActionRolesModule,
    PubSubModule,
  ],
  providers: [ProposalsService, ProposalsResolver],
  exports: [ProposalsService, TypeOrmModule],
})
export class ProposalsModule {}
