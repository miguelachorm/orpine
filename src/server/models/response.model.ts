export interface ResponseModel {
    statusCode: number,
    data: {
        firstName: string,
        lastName: string,
        clientId: string
    }
}