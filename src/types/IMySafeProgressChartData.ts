export interface IMySafeProgressChartData {
    description: string;
    totalSaved: number;
    leftAmount: number;
    total: number;
}

export interface CustomTooltip {
    active?: boolean;
    payload?: Array<any>;
    label?: string;
}