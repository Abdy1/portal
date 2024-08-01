import { AuditProgramDTO } from "./audit program";
import { AuditableAreasDTO } from "./auditableAreas";
import { AuditEngagementDTO } from "./audit-engagement";
import { AuditScheduleDTO } from "./auditSchedule";
import { AuditType } from "./auditType";
import { BaseModel } from "./base";

export class FindingDTO extends BaseModel {
        auditProgram: AuditProgramDTO;
        finding: String;
        criteria:String;
        area: AuditableAreasDTO;
        cause:String;
        implementedControls:String;
        impact:String;
        recommendations:String;

        auditeesResponse:String;
        justifications:String;
        isVisibleToAuditees:boolean;

        rectificationStatus:Boolean;
        rectificationProgress:String;
        rectificationEvidenceAttachmentPath:String;

        isRectificationApproved:Boolean;
        findingEvidenceFileUploadedToSupplementTheFindings:String; 
}
