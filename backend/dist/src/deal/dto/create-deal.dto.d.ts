export declare class CreateDealDTO {
    title: string;
    description: string;
    status?: 'go' | 'nogo' | 'pending';
    archived?: boolean;
    due_date?: Date;
    user_id?: string;
    pipeline_phase_id?: string;
    lead_id?: string;
}
