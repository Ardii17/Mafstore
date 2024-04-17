// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { signUp } from "@/services/auth/services";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  status: boolean;
  statusCode: number;
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    await signUp(req.body, (status: boolean) => {
      if (status) {
        res
          .status(200)
          .json({ status: true, statusCode: 200, name: "success" });
      } else {
        res
          .status(400)
          .json({ status: false, statusCode: 400, name: "failed" });
      }
    });
  } else {
    res
      .status(405)
      .json({ status: false, statusCode: 405, name: "methode not allowed" });
  }
}
