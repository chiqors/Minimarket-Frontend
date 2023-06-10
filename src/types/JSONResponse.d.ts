/**
 * JSONResponse interface
 *
 * @property {number} http_code
 * @property {string} message
 * @property {object} data
 * @property {array} errors
 */
export interface JSONResponse {
    http_code: number;
    message: string;
    data: object;
    errors: string[];
}