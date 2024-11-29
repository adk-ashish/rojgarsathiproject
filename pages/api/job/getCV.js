import ConnectDB from "@/DB/connectDB";
import validateToken from "@/middleware/tokenValidation";
import CV from "@/models/CV";

export default async (req, res) => {
  await ConnectDB();
  const { method } = req;
  switch (method) {
    case "GET":
      await getCV(req, res);

      break;
    default:
      res.status(400).json({ success: false, message: "Invalid Request" });
  }
};

const getCV = async (req, res) => {
  const data = req.query;
  const id = data?.id;

  if (!id)
    return res.status(400).json({ success: false, message: "Please Login" });

  try {
    const getCVDetail = await CV.findById({ user: id });
    return res.status(200).json({ success: true, data: getCVDetail });
  } catch (error) {
    console.log("Error in getting a specifed Job job (server) => ", error);
    return res.status(403).json({
      success: false,
      message: "Something Went Wrong Please Retry login  !",
    });
  }
};
