import { GraphQLResolveInfo, ResponsePath, responsePathAsArray } from "graphql";
import { UNAUTHORIZED } from "../../common/common.constants";
import { GroupPermissions } from "../../groups/group-roles/models/group-permissions.type";
import { ServerPermissions } from "../../server-roles/models/server-permissions.type";
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

export const hasAncestor = (
  ancestor: string,
  path: ResponsePath,
  depth = 5
) => {
  if (!depth) {
    return false;
  }
  if (path.key !== ancestor) {
    if (!path.prev) {
      return false;
    }
    return hasAncestor(ancestor, path.prev, depth - 1);
  }
  return true;
};

export const hasPath = (path: string, info: GraphQLResolveInfo) => {
  const fullPath = responsePathAsArray(info.path).reduce<string>(
    (result, segment) =>
      `${result}${result ? "." : ""}${
        typeof segment === "number" ? "INDEX" : segment
      }`,
    ""
  );
  return fullPath.includes(path);
};
