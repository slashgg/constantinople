export function generateMasterPermission(arn: string) {
  const parts = arn.split('::');

  // Replace the last part with * and reconstruct the arn.
  parts[parts.length - 1] = '*';

  return parts.join('::');
}

export function generateArn(resource: string, id: string, action: string, namespace?: string) {
  let ARN = `${resource}::${id}::${action}`;
  if (namespace) {
    ARN = `${namespace}::${ARN}`;
  }

  return ARN;
}
