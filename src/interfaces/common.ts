export interface BaseServiceResponse {
    status: boolean;
    message?: string;
}

export interface OptionalProperties {
    [key: string]: any
}

export interface ServiceResponse extends BaseServiceResponse, OptionalProperties {}

export interface UserRolesType {
    ADMIN: string;
    USER: string;
    PUBLIC: string;
}