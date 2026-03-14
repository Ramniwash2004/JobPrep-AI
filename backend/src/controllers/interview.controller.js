import InterviewReport from "../models/interviewReport.model.js";
import generateInterviewReport from "../services/ai.service.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const pdfParse = require("pdf-parse");

export const generateInterViewReportController = async (req, res) => {
  try {
    // const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText();
    const resumeContent=await pdfParse(req.file.buffer);
    if (!resumeContent) {
      return res.status(400).json({
        message: "Resume file required"
      });
    }

    const { selfDescription, jobDescription } = req.body;

    // const pdfData = await pdfParse(req.file.buffer);

    const interViewReportByAi = await generateInterviewReport({
      resume: resumeContent.text,
      selfDescription,
      jobDescription
    });

    console.log("AI RESPONSE:", interViewReportByAi);

    const interviewReport = await InterviewReport.create({
        user: req.user.id,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        ...interViewReportByAi
    });

    res.status(201).json({
      message: "Interview report generated successfully",
      interviewReport
    });

  } catch (error) {
    console.error("SERVER ERROR:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};