import { MenuItem } from "../../common/interfaces/menu.interface";

export const menu: MenuItem[] = [
    { name: "Dashboard", path: "dashboard", icon: "icofont icofont-dashboard", active: true },
    { name: "Users", icon: "icofont icofont-users-alt-2", children: [
        { name: "Users", path: "user", icon: "icofont icofont-user-alt-2" },
        { name: "Positions", path: "position", icon: "icofont icofont-worker" }
    ] },
    { name: "Products", path: "products", icon: "icofont icofont-box" },
    { name: "Providers", path: "providers", icon: "icofont icofont-vehicle-delivery-van" }
];
