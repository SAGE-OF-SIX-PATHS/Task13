//I want to format how my responses will be from my API. I will create a function that will take in the response object, data, message, and status code. This function will be used to send a successful response. I will also create a function that will take in the response object, message, and status code. This function will be used to send an error response.
import { Response } from 'express';

export const successResponse = (res: Response, data: any, message: string = 'Success', statusCode: number = 200) => {
          res.status(statusCode).json({ success: true, message, data });
};

export const errorResponse = (res: Response, message: string, statusCode: number = 400) => {
          res.status(statusCode).json({ success: false, message });
};