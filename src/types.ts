
export type mvcConfig = {
    styleDefaults?: any;
}

export interface ModalConfig {
    id: string;
    clickOutsideToClose?: boolean;
    styleOverrides?: any;
    layout: any; // TODO - make this better
}
