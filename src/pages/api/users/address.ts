import { NextApiResponse, NextApiRequest } from "next";
import jwt from "jsonwebtoken";
import { retrieveDataById, updateData } from "@/lib/firebase/services";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
      jwt.verify(
        token,
        process.env.NEXTAUTH_SECRET || "",
        async (err: any, decoded: any) => {
          const data = await retrieveDataById("users", decoded.id);
          if (data) {
            res.status(200).json({
              status: true,
              statusCode: 200,
              message: "Success",
              data: data.address,
            });
          } else {
            res
              .status(404)
              .json({ status: false, statusCode: 404, message: "Failed" });
          }
        }
      );
    } else {
      res.status(403).json({
        status: false,
        statusCode: 403,
        message: "Failed nothing token",
      });
    }
  } else if (req.method === "PUT") {
    const { data } = req.body;
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
      jwt.verify(
        token,
        process.env.NEXTAUTH_SECRET || "",
        async (err: any, decoded: any) => {
          await updateData("users", decoded.id, data, (result: boolean) => {
            if (result) {
              res
                .status(200)
                .json({ status: true, statusCode: 200, message: "Success Update" });
            } else {
              res
                .status(400)
                .json({
                  status: false,
                  statusCode: 400,
                  message: "Failed Update",
                });
            }
          });
        }
      );
    }
  }
}
