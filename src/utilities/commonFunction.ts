import { Request, Response } from "express";

export const failureResponseWithError = (res: Response, status: number, message: string) => {
    console.log("first")
    return res.status(status).json({
      statusCode: status || 500,
      success: false,
      error: message.replace(/"/g, "") || "Somthing went wrong",
    });
  };

  export const successResponseWithData = (res:Response, status: number, message:string, data:any) => {
    return res.status(status).json({
      statusCode: status || 200,
      success: true,
      message: message || "Data retrieved successfully",
      data: data,
    });
  };
  
  export const successResponse = (res: Response, status: number, message: string) => {
    return res.status(status).json({
      statusCode: status || 200,
      success: true,
      message: message || "Data retrieved successfully",
    });
  };