import { AuditEngagementDTO } from "./audit-engagement";
import { AuditScheduleDTO } from "./auditSchedule";
import { AuditType } from "./auditType";
import { BaseModel } from "./base";

export interface CutOffDTO extends BaseModel {
    cutOff: number;
  
}
