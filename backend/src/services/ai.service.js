import { GoogleGenAI } from "@google/genai";
import {z} from 'zod';
import {zodToJsonSchema} from 'zod-to-json-schema';
import puppeteer from "puppeteer";

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})


const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum([ "low", "medium", "high" ]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    title: z.string().describe("The title of the job for which the interview report is generated"),
})

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {


//   const prompt = `
// You are an expert technical interviewer.

// Analyze the candidate profile and generate an interview preparation report.

// Resume:
// ${resume.slice(0,6000)}

// Self Description:
// ${selfDescription}

// Job Description:
// ${jobDescription}

// Return ONLY JSON in this EXACT format:

// {
//  "matchScore": number,
//  "technicalQuestions":[
//    {
//      "question":"string",
//      "intention":"string",
//      "answer":"string"
//    }
//  ],
//  "behavioralQuestions":[
//    {
//      "question":"string",
//      "intention":"string",
//      "answer":"string"
//    }
//  ],
//  "skillGaps":[
//    {
//      "skill":"string",
//      "severity":"low | medium | high"
//    }
//  ],
//  "preparationPlan":[
//    {
//      "day":number,
//      "focus":"string",
//      "tasks":["string"]
//    }
//  ],
//  "title":"string"
// }

// Rules:
// - technicalQuestions must be an ARRAY of OBJECTS
// - behavioralQuestions must be an ARRAY of OBJECTS
// - skillGaps must be an ARRAY of OBJECTS
// - preparationPlan must be an ARRAY of OBJECTS
// - Do NOT return arrays like ["question","intention","answer"]
// - Return only JSON
// `;
 const prompt = `
You are an expert technical interviewer.

Analyze the candidate profile and generate an interview preparation report.

Resume:
${resume.slice(0,6000)}

Self Description:
${selfDescription}

Job Description:
${jobDescription}

Return ONLY JSON following EXACTLY this structure:

{
 "matchScore": number,
 "technicalQuestions": 
   {
     {"question": string,
     "intention": string,
     "answer": string}
   }
 ,
 "behavioralQuestions": 
   {
     {"question": string,
     "intention": string,
     "answer": string}
   }
 ,
 "skillGaps": 
   {
     {"skill": string,
     "severity": "low" | "medium" | "high"}
   }
 ,
 "preparationPlan": 
   {
     {"day": number,
     "focus": string,
     "tasks": [string]}
   }
 ,
 {"title": string}
}

Rules:
- Do NOT add extra fields
- Do NOT rename fields
- Do NOT add explanations
- Output ONLY JSON
`;

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(interviewReportSchema),
        }
    })

    return JSON.parse(response.text)


}

export default generateInterviewReport;







// import { GoogleGenAI } from "@google/genai";
// import {z} from 'zod';
// import {zodToJsonSchema} from 'zod-to-json-schema';
// import puppeteer from "puppeteer";

// // The client gets the API key from the environment variable `GEMINI_API_KEY`.
// const ai = new GoogleGenAI({
//     apiKey:process.env.GOOGLE_GENAI_API_KEY
// });

// const interviewReportSchema = z.object({
//     matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
//     technicalQuestions: z.array(z.object({
//         question: z.string().describe("The technical question can be asked in the interview"),
//         intention: z.string().describe("The intention of interviewer behind asking this question"),
//         answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
//     })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),

//     behavioralQuestions: z.array(z.object({
//         question: z.string().describe("The technical question can be asked in the interview"),
//         intention: z.string().describe("The intention of interviewer behind asking this question"),
//         answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
//     })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),

//     skillGaps: z.array(z.object({
//         skill: z.string().describe("The skill which the candidate is lacking"),
//         severity: z.enum([ "low", "medium", "high" ]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
//     })).describe("List of skill gaps in the candidate's profile along with their severity"),

//     preparationPlan: z.array(z.object({
//         day: z.number().describe("The day number in the preparation plan, starting from 1"),
//         focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
//         tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
//     })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
//     title: z.string().describe("The title of the job for which the interview report is generated"),
// })

// // async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

// //     const prompt = `
// //         You are an expert technical interviewer.
        
// //         Analyze the candidate profile and generate a detailed interview preparation report.

// //         Resume:
// //         ${resume}

// //         Self Description:
// //         ${selfDescription}

// //         Job Description:
// //         ${jobDescription}

// //         Generate:
// //         - matchScore (0-100)
// //         - technical interview questions with intention and answer strategy
// //         - behavioral interview questions with intention and answer strategy
// //         - skill gaps with severity
// //         - a day-wise preparation plan
// //         - job title

// //         Return ONLY valid JSON.
// //         `;

// //     const response = await ai.models.generateContent({
// //         model: "gemini-3-flash-preview",
// //         contents: prompt,
// //         config: {
// //             responseMimeType: "application/json",
// //             responseJsonSchema: zodToJsonSchema(interviewReportSchema),
// //         },
// //     });
// //     return JSON.parse(response.text())
// // }

// async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

//     // const prompt = `
//     //     Generate an interview report for a candidate.

//     //     Resume:
//     //     ${resume.slice(0,6000)}

//     //     Self Description:
//     //     ${selfDescription}

//     //     Job Description:
//     //     ${jobDescription}

//     //     Return valid JSON.
//     // `;
// //     const prompt = `
// // You are an expert technical interviewer.

// // Analyze the candidate profile and generate an interview preparation report.

// // Resume:
// // ${resume.slice(0,6000)}

// // Self Description:
// // ${selfDescription}

// // Job Description:
// // ${jobDescription}

// // Return ONLY valid JSON with EXACTLY these fields:

// // {
// //  "matchScore": number between 0 and 100,
// //  "technicalQuestions": [
// //    {
// //      "question": string,
// //      "intention": string,
// //      "answer": string
// //    }
// //  ],
// //  "behavioralQuestions": [
// //    {
// //      "question": string,
// //      "intention": string,
// //      "answer": string
// //    }
// //  ],
// //  "skillGaps": [
// //    {
// //      "skill": string,
// //      "severity": "low" | "medium" | "high"
// //    }
// //  ],
// //  "preparationPlan": [
// //    {
// //      "day": number,
// //      "focus": string,
// //      "tasks": [string]
// //    }
// //  ],
// //  "title": string
// // }

// // Do not return any other fields.
// // Do not return explanation.
// // Only return JSON.
// // `;

// const prompt = `
// You are an expert technical interviewer.

// Analyze the candidate profile and generate an interview preparation report.

// Resume:
// ${resume.slice(0,6000)}

// Self Description:
// ${selfDescription}

// Job Description:
// ${jobDescription}

// Return ONLY valid JSON.

// STRICT RULES:

// technicalQuestions must be an ARRAY OF OBJECTS like:

// "technicalQuestions": [
//  {
//   "question": "question text",
//   "intention": "why interviewer asks this",
//   "answer": "how candidate should answer"
//  }
// ]

// behavioralQuestions must follow the same format.

// skillGaps must be:

// "skillGaps": [
//  {
//   "skill": "name",
//   "severity": "low | medium | high"
//  }
// ]

// preparationPlan must be:

// "preparationPlan": [
//  {
//   "day": 1,
//   "focus": "topic",
//   "tasks": ["task1","task2"]
//  }
// ]

// Return ONLY JSON.
// Do NOT return explanation.
// Do NOT return markdown.
// `;
// async function callGemini(prompt) {

//     let attempts = 3;

//     while (attempts > 0) {
//         try {

//             const response = await ai.models.generateContent({
//                 model: "gemini-2.5-flash",
//                 contents: prompt,
//                 config: {
//                     responseMimeType: "application/json",
//                     responseSchema: zodToJsonSchema(interviewReportSchema),
//                 },
//             });

//             return response;

//         } catch (error) {

//             if (error.status === 503 && attempts > 1) {
//                 console.log("Gemini overloaded. Retrying...");
//                 await new Promise(r => setTimeout(r, 2000));
//                 attempts--;
//             } else {
//                 throw error;
//             }

//         }
//     }
// }
// const response = await callGemini(prompt);

//     // const response = await ai.models.generateContent({
//     //     model: "gemini-3-flash-preview",
//     //     contents: prompt,
//     //     config: {
//     //         responseMimeType: "application/json",
//     //         responseSchema: zodToJsonSchema(interviewReportSchema),
//     //     },
//     // });
//     // console.log("interie questions",zodToJsonSchema(interviewReportSchema))
//     // const text = response.candidates[0]?.content?.parts[0]?.text;
//     // console.log("response",response.candidates[0].content.parts);
//     // const recipe = interviewReportSchema.parse(JSON.parse(text));
// //     const text = response.candidates[0]?.content.parts[0]?.text;

// // const json = JSON.parse(text);

// // const recipe = interviewReportSchema.parse(json);
// // console.log("recipe",recipe)

// // return recipe;
// // const text = response.candidates?.[0]?.content?.parts?.[0]?.text;

// // if (!text) {
// //     console.error("Invalid AI response:", response);
// //     throw new Error("AI did not return text");
// // }
// // ```js
// let text = response.candidates?.[0]?.content?.parts?.[0]?.text;

// if (!text) {
//     throw new Error("AI did not return text");
// }

// text = text.replace(/```json/g, "").replace(/```/g, "").trim();

// console.log("AI RAW RESPONSE:", text);

// const json = JSON.parse(text);
// console.log("PARSED JSON:", json);

// const result = interviewReportSchema.safeParse(json);

// if (!result.success) {
//     console.error("ZOD ERROR:", result.error);
//     throw new Error("Invalid AI response format");
// }

// return result.data;
// }


// export default generateInterviewReport;