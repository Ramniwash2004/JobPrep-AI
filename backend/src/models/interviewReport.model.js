import mongoose from "mongoose";

export const interviewReportSchema = new mongoose.Schema(
  {
    jobDescription: {
      type: String,
      required: [true, "Job description is required"],
    },

    resume: {
      type: String,
    },

    selfDescription: {
      type: String,
    },

    matchScore: {
      type: Number,
      min: 0,
      max: 100,
    },

    // because AI returns flat string arrays
    technicalQuestions: [String],

    behavioralQuestions: [String],

    skillGaps: [String],

    preparationPlan: [mongoose.Schema.Types.Mixed],

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },

    title: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const interviewReport = mongoose.model("InterviewReport", interviewReportSchema);

export default interviewReport;


// import mongoose from "mongoose";

// //job description
// //resume text
// //self description

// //technical question:[{}]
// //behaviour question:[]
// //skill gaps:[]
// //preparation plan:[{}]

// const technicalQuestionSchema = new mongoose.Schema(
//   {
//     question: {
//       type: String,
//       required: [true, "Technical question is required"],
//     },
//     intention: {
//       type: String,
//       required: [true, "Intention is required"],
//     },
//     answer: {
//       type: String,
//       required: [true, "Answer is required"],
//     },
//   },
//   {
//     _id: false,
//   },
// );

// const behavioralQuestionSchema = new mongoose.Schema(
//   {
//     question: {
//       type: String,
//       required: [true, "Technical question is required"],
//     },
//     intention: {
//       type: String,
//       required: [true, "Intention is required"],
//     },
//     answer: {
//       type: String,
//       required: [true, "Answer is required"],
//     },
//   },
//   {
//     _id: false,
//   },
// );

// const skillGapSchema = new mongoose.Schema(
//   {
//     skill: {
//       type: String,
//       required: [true, "Skill is required"],
//     },
//     severity: {
//       type: String,
//       enum: ["low", "medium", "high"],
//       required: [true, "Severity is required"],
//     },
//   },
//   {
//     _id: false,
//   },
// );

// const preparationPlanSchema = new mongoose.Schema({
//   day: {
//     type: Number,
//     required: [true, "Day is required"],
//   },
//   focus: {
//     type: String,
//     required: [true, "Focus is required"],
//   },
//   tasks: [
//     {
//       type: String,
//       required: [true, "Task is required"],
//     },
//   ],
// });

// export const interviewReportSchema = new mongoose.Schema(
//   {
//     jobDescription: {
//       type: String,
//       required: [true, "Job description is required"],
//     },
//     resume: {
//       type: String,
//     },
//     selfDescription: {
//       type: String,
//     },
//     matchScore: {
//       type: Number,
//       min: 0,
//       max: 100,
//     },
//     technicalQuestions: {technicalQuestionSchema},
//     behavioralQuestions: {behavioralQuestionSchema},
//     skillGaps: {skillGapSchema},
//     preparationPlan: {preparationPlanSchema},
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "users",
//     },
//     title: {
//       type: String,
//       required: [false, "Job title is required"],
//     },
//   },
//   {
//     timestamps: true,
//   },
// );


// const interviewReport =mongoose.model('InterviewReport',interviewReportSchema);

// export default interviewReport;