import {
  addData,
  deleteData,
  retrieveData,
  retrieveDataById,
  updateData,
} from "@/lib/firebase/services";
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { products }: any = req.query;
    if (products && products[0]) {
      const data = await retrieveDataById("products", products[0]);
      res
        .status(200)
        .json({ status: true, statusCode: 200, message: "success", data });
    } else {
      const data = await retrieveData("products");
      res
        .status(200)
        .json({ status: true, statusCode: 200, message: "success", data });
    }
  } else if (req.method === "POST") {
    const data = req.body;
    data.created_at = new Date();
    data.updated_at = new Date();
    data.description = "";
    parseInt(data.size);
    parseInt(data.qty);
    const token = req.headers.authorization?.split(" ")[1] || "";
    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (err: any, decoded: any) => {
        if (decoded) {
          await addData("products", data, (status: boolean, result: any) => {
            if (status) {
              res.status(200).json({
                status: true,
                statusCode: 200,
                message: "success add data",
                data: { id: result.split("/")[1] },
              });
            } else {
              res.status(400).json({
                status: false,
                statusCode: 400,
                message: "failed add data",
                data: {},
              });
            }
          });
        }
      }
    );
  } else if (req.method === "DELETE") {
    const { products }: any = req.query;
    const token = req.headers.authorization?.split(" ")[1] || "";
    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (err: any, decoded: any) => {
        if (decoded) {
          await deleteData("products", products[1], (status: boolean) => {
            if (status) {
              res.status(200).json({
                status: true,
                statusCode: 200,
                message: "success delete data",
              });
            } else {
              res.status(400).json({
                status: false,
                statusCode: 400,
                message: "failed delete data",
              });
            }
          });
        }
      }
    );
  } else if (req.method === "PUT") {
    const { products }: any = req.query;
    const { data } = req.body;
    const token = req.headers.authorization?.split(" ")[1] || "";
    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (err: any, decoded: any) => {
        if (decoded) {
          await updateData("products", products[1], data, (status: boolean) => {
            if (status) {
              res.status(200).json({
                status: true,
                statusCode: 200,
                message: "success update data",
              });
            } else {
              res.status(400).json({
                status: false,
                statusCode: 400,
                message: "failed update data",
              });
            }
          });
        }
      }
    );
  }
}
