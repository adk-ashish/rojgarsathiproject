import ConnectDB from "@/DB/connectDB";
import Joi from "joi";
import CV from "@/models/CV";
import User from "@/models/User";
import formidable from "formidable";
import validateToken from "@/middleware/tokenValidation";

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  summary: Joi.string().required(),
  user: Joi.string().required(),
  experienceYears: Joi.string().required(),
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  await ConnectDB();
  const { method } = req;
  switch (method) {
    case "POST":
      await validateToken(req, res, async () => {
        await createCV(req, res);
      });
      break;
    default:
      res.status(400).json({ success: false, message: "Invalid Request" });
  }
};

const createCV = async (req, res) => {
  await ConnectDB();

  try {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields) => {
      if (err) {
        console.error("Error", err);
        throw err;
      }

      const cvfields = {
        name: fields.name,
        email: fields.email,
        summary: fields.summary,
        user: fields.user,
        seeGrade: fields.seeGrade,
        undergrad: fields.undergrad,
        graduate: fields.graduate,
        skills: fields.skills,
        hobbies: fields.hobbies,
        experienceYears: fields.experienceYears,
      };

      const { name, email, summary, user, experienceYears } = cvfields;

      const { error } = schema.validate({
        name,
        email,
        summary,
        user,
        experienceYears,
      });
      if (error)
        return res.status(400).json({
          success: false,
          message: error.details[0].message.replace(/['"]+/g, ""),
        });

      const u = await User.findOne({ _id: user });
      const cv = await CV.create(cvfields);
      u.cv = cv._id;
      await u.save();
      return res.status(200).json({
        success: true,
        message: "CV created successfully !",
      });
    });
  } catch (error) {
    console.log("error in create CV (server) => ", error);
    return res.status(500).json({
      success: false,
      message: "something went wrong please retry login !",
    });
  }
};
