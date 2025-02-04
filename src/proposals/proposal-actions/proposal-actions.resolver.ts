import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Image } from '../../images/models/image.model';
import { Proposal } from '../models/proposal.model';
import { ProposalsService } from '../proposals.service';
import { ProposalAction } from './models/proposal-action.model';
import { ProposalActionEvent } from './proposal-action-events/models/proposal-action-event.model';
import { ProposalActionEventsService } from './proposal-action-events/proposal-action-events.service';
import { ProposalActionRole } from './proposal-action-roles/models/proposal-action-role.model';
import { ProposalActionRolesService } from './proposal-action-roles/proposal-action-roles.service';
import { ProposalActionsService } from './proposal-actions.service';
import { ProposalActionGroupConfig } from './proposal-action-group-configs/models/proposal-action-group-config.model';
import { ProposalActionGroupConfigsService } from './proposal-action-group-configs/proposal-action-group-configs.service';

@Resolver(() => ProposalAction)
export class ProposalActionsResolver {
  constructor(
    private proposalActionEventsService: ProposalActionEventsService,
    private proposalActionGroupConfigsService: ProposalActionGroupConfigsService,
    private proposalActionRolesService: ProposalActionRolesService,
    private proposalActionsService: ProposalActionsService,
    private proposalsService: ProposalsService,
  ) {}

  @ResolveField(() => Proposal)
  async proposal(@Parent() { proposalId }: ProposalAction) {
    return this.proposalsService.getProposal(proposalId);
  }

  @ResolveField(() => ProposalActionRole)
  async role(@Parent() { id }: ProposalAction) {
    return this.proposalActionRolesService.getProposalActionRole({
      proposalActionId: id,
    });
  }

  @ResolveField(() => ProposalActionEvent)
  async event(@Parent() { id }: ProposalAction) {
    return this.proposalActionEventsService.getProposalActionEvent({
      proposalActionId: id,
    });
  }

  @ResolveField(() => ProposalActionGroupConfig, { nullable: true })
  async groupSettings(@Parent() { id }: ProposalActionGroupConfig) {
    return this.proposalActionGroupConfigsService.getProposalActionGroupConfig({
      proposalActionId: id,
    });
  }

  @ResolveField(() => Image, { nullable: true })
  async groupCoverPhoto(@Parent() { id }: ProposalAction) {
    return this.proposalActionsService.getProposedGroupCoverPhoto(id);
  }
}
