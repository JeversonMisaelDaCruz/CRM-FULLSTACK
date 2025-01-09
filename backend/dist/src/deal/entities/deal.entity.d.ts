export declare class DealEntity {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    description: string;
    status: 'go' | 'nogo' | 'pending';
    archived: boolean;
    dueDate?: Date;
}
