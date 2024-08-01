// import { Request, Response } from "express";
// import { Util } from "../common/util";
// import { extname } from "path";
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");

// // // Configure Multer to handle file uploads
// const multerStorageMultiple = multer.diskStorage({
//   destination: (req: Request, file: any, cb: any) => {
//     if (!fs.existsSync("files")) {
//       fs.mkdirSync("files");
//     }
//     const destinationFolder = "files/photos";

//     // Check if the destination folder exists, and create it if not
//     if (!fs.existsSync(destinationFolder)) {
//       fs.mkdirSync(destinationFolder);
//     }
//     if (!req.user) {
//       return;
//     }
//     const userFolder = `files/photos/${req.user._id}`;
//     if (!fs.existsSync(userFolder)) {
//       fs.mkdirSync(userFolder);
//     }
//     cb(null, userFolder);
//   },
//   filename: (req: Request, file: any, cb: any) => {
//     const ext = file.mimetype.split("/")[1];
//     if (!req.user) {
//       return;
//     }
//     cb(null, `user-${req.user._id}-${Date.now()}.${ext}`);
//   },
// });

// const multerPostStorageMultiple = multer.diskStorage({
//   destination: (req: Request, file: any, cb: any) => {
//     if (!fs.existsSync("files")) {
//       fs.mkdirSync("files");
//     }
//     const destinationFolder = "files/posts";

//     // Check if the destination folder exists, and create it if not
//     if (!fs.existsSync(destinationFolder)) {
//       fs.mkdirSync(destinationFolder);
//     }
//     if (!req.user) {
//       return;
//     }
//     const userFolder = `files/posts/${req.user._id}`;
//     if (!fs.existsSync(userFolder)) {
//       fs.mkdirSync(userFolder);
//     }
//     cb(null, userFolder);
//   },
//   filename: (req: Request, file: any, cb: any) => {
//     const ext = file.mimetype.split("/")[1];
//     if (!req.user) {
//       return;
//     }
//     cb(null, `user-${req.user._id}-${Date.now()}.${ext}`);
//   },
// });

// const multerStoragevideo = multer.diskStorage({
//   destination: (req: Request, file: any, cb: any) => {
//     if (!fs.existsSync("files")) {
//       fs.mkdirSync("files");
//     }
//     const destinationFolder = "files/video";

//     // Check if the destination folder exists, and create it if not
//     if (!fs.existsSync(destinationFolder)) {
//       fs.mkdirSync(destinationFolder);
//     }
//     if (!req.user) {
//       return;
//     }
//     const userFolder = `files/video/${req.user._id}`;
//     if (!fs.existsSync(userFolder)) {
//       fs.mkdirSync(userFolder);
//     }
//     cb(null, userFolder);
//   },
//   filename: (req: Request, file: any, cb: any) => {
//     const ext = file.mimetype.split("/")[1];
//     if (!req.user) {
//       return;
//     }
//     cb(null, `user-${req.user._id}-${Date.now()}.${ext}`);
//   },
// });

// const multerStorageDocuments = multer.diskStorage({
//   destination: (req: Request, file: any, cb: any) => {
//     if (!fs.existsSync("files")) {
//       fs.mkdirSync("files");
//     }
//     const destinationFolder = "files/documents";

//     // Check if the destination folder exists, and create it if not
//     if (!fs.existsSync(destinationFolder)) {
//       fs.mkdirSync(destinationFolder);
//     }
//     if (!req.user) {
//       return;
//     }
//     const userFolder = `files/documents/${req.user._id}`;
//     if (!fs.existsSync(userFolder)) {
//       fs.mkdirSync(userFolder);
//     }
//     cb(null, userFolder);
//   },
//   filename: (req: Request, file: any, cb: any) => {
//     const ext = file.mimetype.split("/")[1];
//     if (!req.user) {
//       return;
//     }
//     cb(null, `user-${req.user._id}-${Date.now()}.${ext}`);
//   },
// });

// const multerStoragepictures = multer.diskStorage({
//   destination: (req: Request, file: any, cb: any) => {
//     if (!fs.existsSync("files")) {
//       fs.mkdirSync("files");
//     }
//     const destinationFolder = "files/pictures";

//     // Check if the destination folder exists, and create it if not
//     if (!fs.existsSync(destinationFolder)) {
//       fs.mkdirSync(destinationFolder);
//     }
//     if (!req.user) {
//       return;
//     }
//     const userFolder = `files/pictures/${req.user._id}`;
//     if (!fs.existsSync(userFolder)) {
//       fs.mkdirSync(userFolder);
//     }
//     cb(null, userFolder);
//   },
//   filename: (req: Request, file: any, cb: any) => {
//     const ext = file.mimetype.split("/")[1];
//     if (!req.user) {
//       return;
//     }
//     cb(null, `user-${req.user._id}-${Date.now()}.${ext}`);
//   },
// });

// const multerProfilePictureStorage = multer.diskStorage({
//   destination: (req: Request, file: any, cb: any) => {
//     if (!fs.existsSync("files")) {
//       fs.mkdirSync("files");
//     }
//     const destinationFolder = "files/posts";

//     // Check if the destination folder exists, and create it if not
//     if (!fs.existsSync(destinationFolder)) {
//       fs.mkdirSync(destinationFolder);
//     }
//     if (!req.user) {
//       return;
//     }
//     const userFolder = `files/photos/${req.user._id}`;
//     if (!fs.existsSync(userFolder)) {
//       fs.mkdirSync(userFolder);
//     }
//     cb(null, userFolder);
//   },
//   filename: (req: Request, file: any, cb: any) => {
//     const ext = file.mimetype.split("/")[1];
//     if (!req.user) {
//       return;
//     }
//     cb(null, `user-${req.user._id}-${Date.now()}.${ext}`);
//   },
// });

// const multerFilterMultiple = (
//   req: Request,
//   file: any,
//   cb: any,
//   res: Response
// ) => {
//   if (file.mimetype.startsWith("image")) {
//     cb(null, true);
//   } else {
//     cb(new Error("Wrong file format."), false);
//   }
// };

// const multerFilterPostMultiple = (
//   req: Request,
//   file: any,
//   cb: any,
//   res: Response
// ) => {
//   const allowedCategories = ["image", "video"];

//   try {
//     const ext = extname(file.originalname).toLowerCase();
//     const category = getCategoryFromExtension(file.originalname);

//     // Check if the file has an allowed category
//     if (allowedCategories.includes(category)) {
//       cb(null, true);
//     } else {
//       cb(new Error("Wrong file format or category not allowed."), false);
//     }
//   } catch (error) {
//     cb(error, false);
//   }
// };

// const multerFilterUniversal = (
//   req: Request,
//   file: any,
//   cb: any,
//   res: Response
// ) => {
//   try {
//     const ext = extname(file.originalname).toLowerCase();
//     const category = getCategoryFromExtension(file.originalname);

//     cb(null, true);
//   } catch (error) {
//     cb(error, false);
//   }
// };

// const multerFilterProfilePicture = (
//   req: Request,
//   file: any,
//   cb: any,
//   res: Response
// ) => {
//   const allowedCategories = ["image"];

//   try {
//     const ext = extname(file.originalname).toLowerCase();
//     const category = getCategoryFromExtension(file.originalname);

//     // Check if the file has an allowed category
//     if (allowedCategories.includes(category)) {
//       cb(null, true);
//     } else {
//       cb(new Error("Wrong file format or category not allowed."), false);
//     }
//   } catch (error) {
//     cb(error, false);
//   }
// };

// const multerFilterPicture = (
//   req: Request,
//   file: any,
//   cb: any,
//   res: Response
// ) => {
//   const allowedCategories = ["image"];

//   try {
//     const ext = extname(file.originalname).toLowerCase();
//     const category = getCategoryFromExtension(file.originalname);

//     // Check if the file has an allowed category
//     if (allowedCategories.includes(category)) {
//       cb(null, true);
//     } else {
//       cb(new Error("Wrong file format or category not allowed."), false);
//     }
//   } catch (error) {
//     cb(error, false);
//   }
// };

// const multerFiltervideo = (req: Request, file: any, cb: any, res: Response) => {
//   const allowedCategories = ["video"];

//   try {
//     const ext = extname(file.originalname).toLowerCase();
//     const category = getCategoryFromExtension(file.originalname);

//     // Check if the file has an allowed category
//     if (allowedCategories.includes(category)) {
//       cb(null, true);
//     } else {
//       cb(new Error("Wrong file format or category not allowed."), false);
//     }
//   } catch (error) {
//     cb(error, false);
//   }
// };

// const multerFilterany = (req: Request, file: any, cb: any, res: Response) => {
//   const allowedCategories = ["image", "video", "other"];

//   try {
//     const ext = extname(file.originalname).toLowerCase();
//     const category = getCategoryFromExtension(file.originalname);

//     // Check if the file has an allowed category
//     if (allowedCategories.includes(category)) {
//       cb(null, true);
//     } else {
//       cb(new Error("Wrong file format or category not allowed."), false);
//     }
//   } catch (error) {
//     cb(error, false);
//   }
// };

// export function getCategoryFromExtension(fileName: string): string {
//   const ext = extname(fileName).toLowerCase();

//   // Define image extensions
//   const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp"];

//   // Define video extensions
//   const videoExtensions = [".mp4", ".avi", ".mov", ".mkv", ".wmv"];

//   // Check if the file has an image extension
//   if (imageExtensions.includes(ext)) {
//     return "image";
//   }

//   // Check if the file has a video extension
//   if (videoExtensions.includes(ext)) {
//     return "video";
//   }

//   // Default to 'other' for unknown file types
//   return "other";
// }

// // export const upload = multer({ storage });

// const uploadMultiple = multer({
//   storage: multerStorageMultiple,
//   fileFilter: multerFilterMultiple,
// });

// const PostUploadMultiple = multer({
//   storage: multerPostStorageMultiple,
//   fileFilter: multerFilterPostMultiple,
// });

// const ProfilePictureUpload = multer({
//   storage: multerProfilePictureStorage,
//   fileFilter: multerFilterProfilePicture,
// });

// const pictureUpload = multer({
//   storage: multerStoragepictures,
//   fileFilter: multerFilterPicture,
// });

// const videoUpload = multer({
//   storage: multerStoragevideo,
//   fileFilter: multerFiltervideo,
// });

// const DocumentUpload = multer({
//   storage: multerStorageDocuments,
//   fileFilter: multerFilterUniversal,
// });

// export const uploadImageMultiple = uploadMultiple.array("images", 4);
// export const uploadPostImageMultiple = PostUploadMultiple.array("images", {
//   min: 1,
//   max: 10,
// });
// export const uploadPicturesMultiple = pictureUpload.array("images", {
//   min: 1,
//   max: 10,
// });
// export const uploadVideosMultiple = videoUpload.array("videos", {
//   min: 1,
//   max: 10,
// });

// export const uploaDocumentsMultiple = videoUpload.array("videos", {
//   min: 1,
//   max: 10,
// });
// export const uploadProfilePicture = ProfilePictureUpload.array("images", 1);

// ////////////////////////////!SECTION

// const multerStorageSingle = multer.diskStorage({
//   destination: (req: Request, file: any, cb: any) => {
//     if (!fs.existsSync("files")) {
//       fs.mkdirSync("files");
//     }
//     const destinationFolder = "files/introduce";
//     // Check if the destination folder exists, and create it if not
//     if (!fs.existsSync(destinationFolder)) {
//       fs.mkdirSync(destinationFolder);
//     }
//     cb(null, destinationFolder);
//   },

//   filename: (req: Request, file: any, cb: any) => {
//     if (!req.user) {
//       return;
//     }
//     // Use req to access request-specific properties if needed
//     // req.file.name = `files/introduce/${req.user._id}`;
//     const ext = file.mimetype.split("/")[1];
//     // const orderIdsArr = req.body.orderIds.split(",");
//     cb(null, `user-${req.user._id}=${Date.now()}.${ext}`);
//     // cb(null, `order-${orderIdsArr[0]}=${Date.now()}.${ext}`);
//   },
// });

// const multerFilterSingle = (
//   req: Request,
//   file: any,
//   cb: any,
//   res: Response
// ) => {
//   if (file.mimetype.startsWith("video")) {
//     cb(null, true);
//   } else {
//     cb(new Error("Wrong file format."), false);
//   }
// };

// const uploadSingle = multer({
//   storage: multerStorageSingle,
//   fileFilter: multerFilterSingle,
// });

// export const uploadVideoSingle = uploadSingle.single("video");

// /// Business Registration and TAX doc upload middlewares below
// // Add a new multer storage configuration for tax and business registration documents
// const multerStorageDocs = multer.diskStorage({
//   destination: (req: Request, file: any, cb: any) => {
//     if (!fs.existsSync("files")) {
//       fs.mkdirSync("files");
//     }
//     const destinationFolder = "files/documents";
//     // Check if the destination folder exists, and create it if not
//     if (!fs.existsSync(destinationFolder)) {
//       fs.mkdirSync(destinationFolder);
//     }

//     let subFolder = "";

//     if (file.fieldname === "brDoc") {
//       subFolder = "br";
//     } else if (file.fieldname === "taxDoc") {
//       subFolder = "taxOrPan";
//     }

//     const docFolder = `files/documents/${subFolder}`;
//     if (!fs.existsSync(docFolder)) {
//       fs.mkdirSync(docFolder);
//     }
//     cb(null, docFolder);
//   },
//   filename: (req: Request, file: any, cb: any) => {
//     if (!req.user) {
//       return;
//     }
//     const ext = file.mimetype.split("/")[1];
//     cb(null, `user-${req.user._id}-${Date.now()}.${ext}`);
//   },
// });

// // Create a new multer filter for tax and business registration documents
// const multerFilterDocs = (req: Request, file: any, cb: any) => {
//   if (
//     file.mimetype === "application/pdf" ||
//     file.mimetype.startsWith("image")
//   ) {
//     cb(null, true);
//   } else {
//     cb(new Error("Wrong file format. Only PDF and images are allowed."), false);
//   }
// };

// // Middleware for Business Registration (BR) document
// const uploadDocs = multer({
//   storage: multerStorageDocs,
//   fileFilter: multerFilterDocs,
// });
// export const uploadDocsMiddleware = uploadDocs.fields([
//   { name: "brDoc", maxCount: 1 },
//   { name: "taxDoc", maxCount: 1 },
// ]);
