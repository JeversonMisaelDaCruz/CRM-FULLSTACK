export class UpdateDealDTO {
  title?: string;
  description?: string;
  status?: 'go' | 'nogo' | 'pending';
  archived?: boolean;
  due_date?: Date;
}
