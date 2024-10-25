export class LeadEntity {
  id: string;
  name: string;
  phone: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  user_id?: string;
  leads_status_id?: string;
}
