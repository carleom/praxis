import { UNAUTHORIZED } from "../../common/common.constants";
import { GroupPermissions } from "../../groups/group-roles/models/group-role-permission.model";
import { ServerPermissions } from "../../server-roles/models/server-role-permission.model";
import { UserPermissions } from "../../users/user.types";

export const hasServerPermission = (
  permissions: UserPermissions | null,
  permission: keyof ServerPermissions
) => {
  if (!permissions) {
    return UNAUTHORIZED;
  }
  const hasPermission = permissions.serverPermissions[permission];
  if (!hasPermission) {
    return false;
  }
  return true;
};

export const hasGroupPermission = (
  permissions: UserPermissions | null,
  permission: keyof GroupPermissions,
  groupId: number
) => {
  if (!permissions) {
    return UNAUTHORIZED;
  }
  const groupPermissions = permissions.groupPermissions[groupId];
  if (!groupPermissions || !groupPermissions[permission]) {
    return false;
  }
  return true;
};
