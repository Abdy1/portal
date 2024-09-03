import { RistScoreDTO } from "./RiskScoreDTO";
import { AuditObjectDTO } from "./auditObject";
import { AuditUniverseDTO } from "./auditUniverse";
import { BaseModel } from "./base";

export class ReportTemplateDTO extends BaseModel {


    name:string;

    introduction:string;

    summary:string;

}

