// import { Request, Response } from "express";
// import { Util } from "../common/util";
// import { extname } from "path";
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");
// import * as aws from "aws-sdk";
// import multerS3 from "multer-s3";
// import { S3Client } from "@aws-sdk/client-s3";

// // aws.config.update({
// //   accessKeyId: "your-access-key-id",
// //   secretAccessKey: "your-secret-access-key",
// //   region: "your-region",
// // });

// const s3 = new S3Client({
//   // endpoint: process.env.AWS_REGION_ENDPOINT,
//   credentials: {
//     accessKeyId: process.env.AWS_S3_ACCESSKEY_ID || "",
//     secretAccessKey: process.env.AWS_S3_SECRET_ACCESSKEY || "",
//   },
//   region: process.env.AWS_S3_REGION || "us-east-1",
// });

// // // Configure Multer to handle file uploads
// const multerStorageMultiple = multerS3({
//   s3: s3,
//   bucket: process.env.AWS_S3_BUCKET || "",
//   //   acl: "public-read", // Set ACL permissions as needed
//   key: (req: Request, file: any, cb: any) => {
//     const ext = file.mimetype.split("/")[1];
//     if (!req.user) {
//       return;
//     }
//     cb(null, `introduce/images/user-${req.user._id}-${Date.now()}.${ext}`);
//   },
// });

// const multerPostStorageMultiple = multerS3({
//   s3: s3,
//   bucket: process.env.AWS_S3_BUCKET || "",
//   //   acl: "public-read", // Set ACL permissions as needed
//   key: (req: Request, file: any, cb: any) => {
//     const ext = file.mimetype.split("/")[1];
//     if (!req.user) {
//       return;
//     }
//     cb(null, `files/posts/user-${req.user._id}-${Date.now()}.${ext}`);
//   },
// });

// const multerStoragevideo = multerS3({
//   s3: s3,
//   bucket: process.env.AWS_S3_BUCKET || "",
//   //   acl: "public-read", // Set ACL permissions as needed
//   key: (req: Request, file: any, cb: any) => {
//     const ext = file.mimetype.split("/")[1];
//     if (!req.user) {
//       return;
//     }
//     cb(null, `files/video/user-${req.user._id}-${Date.now()}.${ext}`);
//   },
// });

// const multerStorageDocuments = multerS3({
//   s3: s3,
//   bucket: process.env.AWS_S3_BUCKET || "",
//   //   acl: "public-read", // Set ACL permissions as needed
//   key: (req: Request, file: any, cb: any) => {
//     const ext = file.mimetype.split("/")[1];
//     if (!req.user) {
//       return;
//     }
//     cb(null, `files/documents/user-${req.user._id}-${Date.now()}.${ext}`);
//   },
// });

// const multerStoragepictures = multerS3({
//   s3: s3,
//   bucket: process.env.AWS_S3_BUCKET || "",
//   //   acl: "public-read", // Set ACL permissions as needed
//   key: (req: Request, file: any, cb: any) => {
//     const ext = file.mimetype.split("/")[1];
//     if (!req.user) {
//       return;
//     }
//     cb(null, `files/pictures/user-${req.user._id}-${Date.now()}.${ext}`);
//   },
// });

// const multerProfilePictureStorage = multerS3({
//   s3: s3,
//   bucket: process.env.AWS_S3_BUCKET || "",
//   //   acl: "public-read", // Set ACL permissions as needed
//   key: (req: Request, file: any, cb: any) => {
//     const ext = file.mimetype.split("/")[1];
//     if (!req.user) {
//       return;
//     }
//     cb(null, `files/photos/user-${req.user._id}-${Date.now()}.${ext}`);
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
// // export const uploadPostImageMultiple = PostUploadMultiple.array("images", {
// //   min: 1,
// //   max: 10,
// // });
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

// //upload introduce video
// const multerStorageSingle = multerS3({
//   s3: s3,
//   bucket: process.env.AWS_S3_BUCKET || "",
//   // acl: "public-read", // Set ACL permissions as needed

//   key: (req: Request, file: any, cb: any) => {
//     if (!req.user) {
//       return;
//     }
//     const ext = file.mimetype.split("/")[1];
//     cb(null, `introduce/videos/user-${req.user._id}-${Date.now()}.${ext}`);
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
// const multerStorageDocs = multerS3({
//   s3: s3,
//   bucket: process.env.AWS_S3_BUCKET || "",
//   //   acl: "public-read", // Set ACL permissions as needed
//   key: (req: Request, file: any, cb: any) => {
//     if (!req.user) {
//       return;
//     }
//     const ext = file.mimetype.split("/")[1];
//     const subFolder = file.fieldname === "brDoc" ? "brDoc" : "taxDoc";
//     cb(
//       null,
//       `documents/${subFolder}/user-${req.user._id}-${Date.now()}.${ext}`
//     );
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

// //upload post image
// const multerStoragePostImage = multerS3({
//   s3: s3,
//   bucket: process.env.AWS_S3_BUCKET || "",
//   // acl: "public-read", // Set ACL permissions as needed

//   key: (req: Request, file: any, cb: any) => {
//     if (!req.user) {
//       return;
//     }
//     const ext = file.mimetype.split("/")[1];
//     cb(null, `posts/images/user-${req.user._id}-${Date.now()}.${ext}`);
//   },
// });

// const multerPostImageFilter = (
//   req: Request,
//   file: any,
//   cb: any,
//   res: Response
// ) => {
//   console.log('came1')
//   console.log(file.mimetype)
//   if (file.mimetype.startsWith("image") || file.mimetype.startsWith("video")) {
//     console.log('came2')
//     cb(null, true);
//   } else {
//     cb(new Error("Wrong file format."), false);
//   }
// };

// const createPostImage = multer({
//   storage: multerStoragePostImage,
//   fileFilter: multerPostImageFilter,
// });

// export const  createPostImageUpload = createPostImage.single("image");


// //upload Chat image
// const multerStorageChatImage = multerS3({
//   s3: s3,
//   bucket: process.env.AWS_S3_BUCKET || "",
//   // acl: "public-read", // Set ACL permissions as needed

//   key: (req: Request, file: any, cb: any) => {
//     if (!req.user) {
//       return;
//     }
//     const ext = file.mimetype.split("/")[1];
//     cb(null, `chats/images/user-${req.user._id}-${Date.now()}.${ext}`);
//   },
// });

// const multerChatImageFilter = (
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

// const createChatImage = multer({
//   storage: multerStorageChatImage,
//   fileFilter: multerChatImageFilter,
// });

// export const  createChatImageUpload = createChatImage.single("image");


// //upload profile image
// const multeruploadProfileImage = multerS3({
//   s3: s3,
//   bucket: process.env.AWS_S3_BUCKET || "",
//   // acl: "public-read", // Set ACL permissions as needed

//   key: (req: Request, file: any, cb: any) => {
//     if (!req.user) {
//       return;
//     }
//     const ext = file.mimetype.split("/")[1];
//     cb(null, `users/profileImages/user-${req.user._id}-${Date.now()}.${ext}`);
//   },
// });

// const multerFilterUploadProfileImage = (
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

// const uploadProfileImageSingle = multer({
//   storage: multeruploadProfileImage,
//   fileFilter: multerFilterUploadProfileImage,
// });

// export const uploadProfileImage = uploadProfileImageSingle.single("image");

// //upload post thumbnail image
// const multerStoragePostThumbnailImage = multerS3({
//   s3: s3,
//   bucket: process.env.AWS_S3_BUCKET || "",
//   // acl: "public-read", // Set ACL permissions as needed

//   key: (req: Request, file: any, cb: any) => {
//     if (!req.user) {
//       return;
//     }
//     const ext = file.mimetype.split("/")[1];
//      console.log(file.mimetype,'==========================')
//     cb(null, `posts/images/thumbnail-user-${req.user._id}-${Date.now()}.${ext}`);
//   },
// });

// const multerPostThumbnailImageFilter = (
//   req: Request,
//   file: any,
//   cb: any,
//   res: Response
// ) => {
//   console.log(file.mimetype)
//   console.log(file.mimetype,'==========================')
//   if (file.mimetype.startsWith("image")) {
//     cb(null, true);
//   } else {
//     cb(new Error("Wrong file format."), false);
//   }
// };

// const createMulterPostVideoThumbnail = multer({
//   storage: multerStoragePostThumbnailImage,
//   fileFilter: multerPostThumbnailImageFilter,
// });

// export const  createPostVideoThumbnail = createMulterPostVideoThumbnail.single("thumbnail");

// ////////////////////////////////post images multiple

// const uploadImagesMulitpleStorage = multerS3({
//   s3: s3,
//   bucket: process.env.AWS_S3_BUCKET || "",
//   //   acl: "public-read", // Set ACL permissions as needed
//   key: (req: Request, file: any, cb: any) => {
//     const ext = file.mimetype.split("/")[1];
//     if (!req.user) {
//       return;
//     }
//     cb(null, `posts/media/user-${req.user._id}-${Date.now()}.${ext}`);
//   },
// });

// const uploadImagesMulitpleFilter = (
//   req: Request,
//   file: any,
//   cb: any,
//   res: Response
// ) => {
//   if (file.mimetype.startsWith("image") || file.mimetype.startsWith("video")) {
//     cb(null, true);
//   } else {
//     cb(new Error("Wrong file format."), false);
//   }
// };


// const createPostUploadMultiple = multer({
//   storage: uploadImagesMulitpleStorage,
//   fileFilter: uploadImagesMulitpleFilter,
// });

// export const uploadPostImageMultiple = createPostUploadMultiple.array("images", 4);