import { Request, Response } from "express";
import axios from "axios";
import { exportDataSchema, getUserListSchema } from "../utilities/validation";
import {
  failureResponseWithError,
  successResponseWithData,
} from "../utilities/commonFunction";
import { CreateUser } from "../model/request/userRequest";
import User from "../model/userSchema";

// const apiUrl = "https://randomuser.me/api/";
// const totalRequests = 5000; // Total requests to fetch
// const requestsPerBatch = 300; // Requests per batch
// const requestsPerSecond = 5; // Max requests per second
// const sleepTime = 1000; // Time to sleep between requests (in milliseconds)
// const sleepAfterRequests = 5;
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Export data to Database
export const exportDataToDB = async (
  req: Request,
  res: Response
): Promise<any> => {
  //   const { error, value } = exportDataSchema.validate(req.body);
  //   if (error) {
  //     return failureResponseWithError(res, 400, error.details[0].message);
  //   }
  try {
    const apiUrl = "https://randomuser.me/api/";
    const totalRequests = 5000; // Total requests to fetch
    const requestsPerBatch = 1; // Requests per batch
    const requestsPerSecond = 5; // Max requests per second
    const sleepTime = 1000;
    const sleepAfterRequests = 5;

    let count = 0;
    let batchResult = [];
    for (let i = 0; i < 12; i++) {
      const response = await axios.get(apiUrl, {
        params: { results: requestsPerBatch },
      });
      let currentUser = response.data.results;

      const creatUser: CreateUser = {} as CreateUser;
      creatUser.name = `${currentUser[0].name.first} ${currentUser[0].name.last}`;
      creatUser.gender = currentUser[0].gender;
      creatUser.email = currentUser[0].email;
      creatUser.age = currentUser[0].dob.age;
      creatUser.picture = currentUser[0].picture.large;
      creatUser.address = {
        city: currentUser[0].location.city,
        country: currentUser[0].location.country,
        state: currentUser[0].location.state,
        street: currentUser[0].location.street.name,
      };
      batchResult.push(creatUser);
      count++;
      if (count == 5) {
        await User.insertMany(batchResult);
        console.log("50", batchResult.length);
        batchResult = [];
        count = 0;
      }
    }
    console.log(batchResult.length);
    if (batchResult.length > 0) {
      await User.insertMany(batchResult);
    }
  } catch (error: any) {
    console.log("Err", error.message);
    return failureResponseWithError(res, 500, "Failed to export data");
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<any> => {
  console.log(req.body);

  const { error, value } = getUserListSchema.validate(req.body);
  if (error) {
    return failureResponseWithError(res, 400, error.details[0].message);
  }

  try {
    const { pageIndex, pageSize, name, email, age, gender, country } = req.body;
    const filter: any = {};

    if (name) filter.name = { $regex: `.*${name}.*`, $options: "i" };
    if (email) filter.email = { $regex: email, $options: "i" };
    if (age) filter.age = Number(age); // Exact match for age
    if (gender) filter.gender = { $regex: gender, $options: "i" };
    if (country) filter["address.country"] = { $regex: country, $options: "i" };

    const options = {
      skip: (Number(pageIndex) - 1) * Number(pageSize),
      limit: Number(pageSize),
    };
    // Fetch filtered and paginated results
    const users = await User.find(filter, null, options);

    // Total number of users for this filter
    const total = await User.countDocuments(filter);

    if (users.length === 0) {
      return failureResponseWithError(res, 400, "No data found");
    }

    let responseObj = {
      users: users,
      total,
      page: Number(pageIndex),
      limit: Number(pageSize),
      totalPages: Math.ceil(total / Number(pageSize)),
    };
    return successResponseWithData(res, 200, "Successfully", responseObj);
  } catch (error: any) {
    console.log("Err", error.message);
    return failureResponseWithError(res, 500, "Failed to export data");
  }
};
