export enum Profession {
    ALL = 'all',
    MANAGER = 'manager',
    DEVELOPER = 'developer',
    DESIGNER = 'designer',
    MARKETING = 'marketing',
    HR = 'hr',
}

export enum StatusCode {
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NO_CONTENT = 204,
    NOT_MODIFIED = 304,
    BAD_REQUEST = 400,
    UNAUTHORISED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    NOT_ACCEPTABLE = 406,
    CONFLICT = 409,
    UNPROCESSABLE_CONTENT = 422,
    INTERNAL_SERVER_ERROR = 500,
    BAD_GATEWAY = 502,
}
