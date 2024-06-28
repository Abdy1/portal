import { Branch } from "../../../models/sso-models/branch";
import { SubProcess } from "../../../models/sso-models/sub-process";
import { CollateralType } from "./collatoral-type";
import { IPCT } from "./ipct";
import { Status } from "./status";

export class CIPM {
  id: number;
  borrowerName: string;
  mortgagorName: string;
  loanAccount: string;
  sumInsured: string;
  collateralEstimationValue: string;
  loanType: string;
  preparedBy: string;
  preparationTimeStamp: string;
  authorizedBy: string;
  policyNumber: string;
  referenceNumber: string;
  authorizationTimeStamp: string;
  collateralType: CollateralType;
  status: Status;
  otherCollateralType: string;
  insuranceCoverageType:IPCT 

  otherInsuranceCoverageType: string;
  insuredName: string;
  isAuthorized: boolean;
  insuranceExpireDate: Date;
  branch: Branch;
  subProcess: SubProcess;
  insuranceCompanyName?: string; // Nullable property
  insuranceBranch?: string;
  bbranch?: string; // Nullable property
  insuranceDistrict?: string; // Nullable property
}


