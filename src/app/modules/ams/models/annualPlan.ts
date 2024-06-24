import { RistScoreDTO } from "./RiskScoreDTO";
import { AuditObjectDTO } from "./auditObject";
import { AuditUniverseDTO } from "./auditUniverse";
import { BaseModel } from "./base";

export class AnnualPlanDTO extends BaseModel {
    year: string;
    riskLevel : string | null;
    riskScore : number | null;
    status : string | null;
    rectificationStatus : string | null;
    auditObject : AuditObjectDTO ;
    riskScores : RistScoreDTO[] | null;
    // auditeesOrganID:number;

}

