import { BaseModel } from './base';
import { Employee } from './employee';

export class SignatureDTO extends BaseModel {
  employeeId: number;
  signature: BinaryData;

  employee: Employee;
}
