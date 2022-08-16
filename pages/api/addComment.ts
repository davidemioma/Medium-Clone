import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../utils/sanity";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { _id, name, email, comment } = JSON.parse(req.body);

  await client
    .create({
      _type: "comment",
      post: {
        _type: "reference",
        _ref: _id,
      },
      name,
      email,
      comment,
    })
    .then(() => res.status(200).json({ message: "Comment Submitted" }))
    .catch((err) =>
      res.status(500).json({ message: "Couldn't submit comment Doe", err })
    );
}
