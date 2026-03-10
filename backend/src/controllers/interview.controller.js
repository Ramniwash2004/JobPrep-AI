import InterviewReport from "../models/interviewReport.model.js";
import generateInterviewReport from "../services/ai.service.js";
import pdfParse from "pdf-parse";

export const generateInterViewReportController = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        message: "Resume file required"
      });
    }

    const { selfDescription, jobDescription } = req.body;

    const pdfData = await pdfParse(req.file.buffer);

    const interViewReportByAi = await generateInterviewReport({
      resume: pdfData.text,
      selfDescription,
      jobDescription
    });

    const interviewReport = await InterviewReport.create({
      user: req.user.id,
      resume: pdfData.text,
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