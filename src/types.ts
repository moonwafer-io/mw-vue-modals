
export type VueModalsConfig = {
    styleDefaults?: any;
}

export interface ModalConfig {
    id: string;
    clickOutsideToClose?: boolean;
    styleOverrides?: any;
    layout: any; // TODO - Define this type more thoroughly.
}
