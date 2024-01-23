import {  ACTION, AuditLog } from "@prisma/client"

export const generateLogMessage = (log: AuditLog) => {
  const { action, entityTitle, entityType } = log;

  switch (action) {
    case ACTION.CREATE:
      return `${entityType.toLowerCase()} "${entityTitle}"`;
    case ACTION.UPDATE:
      return `${entityType.toLowerCase()} "${entityTitle}"`;
    case ACTION.DELETE:
      return `${entityType.toLowerCase()} "${entityTitle}"`;
    default:
      return `Unknown action: ${entityType.toLowerCase()} "${entityTitle}"`;
  }
}