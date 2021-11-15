import { MenuItem } from "../../common/interfaces/menu.interface";

export const menu: MenuItem[] = [
    { name: "Dashboard", path: "admin/dashboard", icon: "icofont icofont-dashboard", active: true },
    { name: "Errors", path: "admin/errorLog", icon: "icofont icofont-info-circle" },
    { name: "Roam", path: "admin/roam", icon: "icofont icofont-eye-alt" }
];
