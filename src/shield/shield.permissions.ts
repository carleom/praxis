import { allow, or, shield } from 'graphql-shield';
import { FORBIDDEN } from '../common/common.constants';
import { isAuthenticated } from './rules/auth.rules';
import {
  isOwnComment,
  isPublicComment,
  isPublicCommentImage,
} from './rules/comment.rules';
import {
  isPublicEvent,
  isPublicEventImage,
  isPublicEventPost,
} from './rules/event.rules';
import {
  canApproveGroupMemberRequests,
  canCreateGroupEvents,
  canDeleteGroup,
  canManageGroupComments,
  canManageGroupEvents,
  canManageGroupPosts,
  canManageGroupRoles,
  canManageGroupSettings,
  canUpdateGroup,
  isGroupMember,
  isProposalGroupJoinedByMe,
  isPublicGroup,
  isPublicGroupImage,
  isPublicGroupRole,
} from './rules/group.rules';
import { isOwnPost, isPublicPost, isPublicPostImage } from './rules/post.rules';
import {
  isPublicProposal,
  isPublicProposalAction,
  isPublicProposalImage,
  isPublicVote,
} from './rules/proposal.rules';
import {
  canCreateServerInvites,
  canManageComments,
  canManageEvents,
  canManagePosts,
  canManageServerInvites,
  canManageServerRoles,
  canManageServerSettings,
  canRemoveMembers,
} from './rules/role.rules';
import { isPublicUserAvatar, isUserInPublicGroups } from './rules/user.rules';

export const shieldPermissions = shield(
  {
    Query: {
      isFirstUser: allow,
      users: canRemoveMembers,
      serverInvite: allow,
      serverInvites: or(canCreateServerInvites, canManageServerInvites),
      serverConfig: canManageServerSettings,
      post: or(isAuthenticated, isPublicPost, isPublicEventPost),
      proposal: or(isAuthenticated, isPublicProposal),
      group: or(isAuthenticated, isPublicGroup),
      event: or(isAuthenticated, isPublicEvent),
      groupRole: isGroupMember,
      publicGroupsFeed: allow,
      publicGroups: allow,
      publicCanary: allow,
      events: allow,
    },
    Mutation: {
      login: allow,
      logOut: allow,
      signUp: allow,
      createVote: isProposalGroupJoinedByMe,
      updatePost: isOwnPost,
      deletePost: or(isOwnPost, canManagePosts, canManageGroupPosts),
      createServerInvite: or(canCreateServerInvites, canManageServerInvites),
      deleteServerInvite: canManageServerInvites,
      updateServerConfig: canManageServerSettings,
      createServerRole: canManageServerRoles,
      updateServerRole: canManageServerRoles,
      deleteServerRole: canManageServerRoles,
      deleteServerRoleMember: canManageServerRoles,
      approveGroupMemberRequest: canApproveGroupMemberRequests,
      updateGroupConfig: canManageGroupSettings,
      updateGroup: canUpdateGroup,
      deleteGroup: canDeleteGroup,
      createGroupRole: canManageGroupRoles,
      updateGroupRole: canManageGroupRoles,
      deleteGroupRole: canManageGroupRoles,
      deleteGroupRoleMember: canManageGroupRoles,
      createEvent: or(canCreateGroupEvents, canManageGroupEvents),
      deleteEvent: or(canManageEvents, canManageGroupEvents),
      updateEvent: or(canManageEvents, canManageGroupEvents),
      updateComment: isOwnComment,
      deleteComment: or(
        isOwnComment,
        canManageComments,
        canManageGroupComments,
      ),
    },
    User: {
      id: or(isAuthenticated, isUserInPublicGroups),
      name: or(isAuthenticated, isUserInPublicGroups),
      profilePicture: or(isAuthenticated, isUserInPublicGroups),
    },
    Group: {
      id: or(isAuthenticated, isPublicGroup),
      name: or(isAuthenticated, isPublicGroup),
      description: or(isAuthenticated, isPublicGroup),
      coverPhoto: or(isAuthenticated, isPublicGroup),
      settings: or(isAuthenticated, isPublicGroup),
      feed: or(isAuthenticated, isPublicGroup),
      futureEvents: or(isAuthenticated, isPublicGroup),
      pastEvents: or(isAuthenticated, isPublicGroup),
      memberCount: or(isAuthenticated, isPublicGroup),
      memberRequests: canApproveGroupMemberRequests,
      memberRequestCount: canApproveGroupMemberRequests,
      roles: isGroupMember,
    },
    GroupConfig: or(isAuthenticated, isPublicGroup),
    GroupRole: {
      id: or(isAuthenticated, isPublicGroupRole),
      name: or(isAuthenticated, isPublicGroupRole),
      color: or(isAuthenticated, isPublicGroupRole),
    },
    Image: {
      id: or(
        isAuthenticated,
        isPublicCommentImage,
        isPublicEventImage,
        isPublicGroupImage,
        isPublicPostImage,
        isPublicProposalImage,
        isPublicUserAvatar,
      ),
      filename: or(
        isAuthenticated,
        isPublicCommentImage,
        isPublicPostImage,
        isPublicProposalImage,
      ),
    },
    ServerInvite: {
      id: allow,
      token: allow,
    },
    Canary: {
      id: allow,
      statement: allow,
      updatedAt: allow,
    },
    AuthPayload: {
      access_token: allow,
    },
    Event: or(isAuthenticated, isPublicEvent),
    Post: or(isAuthenticated, isPublicPost, isPublicEventPost),
    Comment: or(isAuthenticated, isPublicComment),
    Proposal: or(isAuthenticated, isPublicProposal),
    ProposalConfig: or(isAuthenticated, isPublicProposal),
    ProposalAction: or(isAuthenticated, isPublicProposalAction),
    ProposalActionEvent: or(isAuthenticated, isPublicProposalAction),
    ProposalActionEventHost: or(isAuthenticated, isPublicProposalAction),
    ProposalActionPermission: or(isAuthenticated, isPublicProposalAction),
    ProposalActionRole: or(isAuthenticated, isPublicProposalAction),
    ProposalActionRoleMember: or(isAuthenticated, isPublicProposalAction),
    ProposalActionGroupConfig: or(isAuthenticated, isPublicProposalAction),
    Vote: or(isAuthenticated, isPublicVote),
  },
  {
    fallbackRule: isAuthenticated,
    fallbackError: FORBIDDEN,
    allowExternalErrors: true,
  },
);
