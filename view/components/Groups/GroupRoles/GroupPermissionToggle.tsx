import { GroupRolePermissionInput } from '../../../graphql/gen';
import { GroupRolePermissionsFragment } from '../../../graphql/groups/fragments/gen/GroupRolePermissions.gen';
import PermissionToggle from '../../Roles/PermissionToggle';

interface Props {
  formValues: GroupRolePermissionInput;
  permissionName: keyof GroupRolePermissionInput;
  permissions: GroupRolePermissionsFragment;
  setFieldValue(field: string, value?: boolean): void;
}

const GroupPermissionToggle = ({
  formValues,
  permissionName,
  permissions,
  setFieldValue,
}: Props) => {
  const permissionInput = formValues[permissionName];
  const isEnabled = permissions[permissionName];

  return (
    <PermissionToggle
      permissionName={permissionName}
      permissionInput={permissionInput}
      setFieldValue={setFieldValue}
      isEnabled={isEnabled}
    />
  );
};

export default GroupPermissionToggle;
