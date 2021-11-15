export interface MenuItem {
    id?: number
    for?: number
    name: string;
    path?: string;
    icon: string;
    active?: boolean
    children?: MenuItem[];
    opened?: boolean;
}
