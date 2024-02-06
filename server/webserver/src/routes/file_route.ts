import express from "express";
const router = express.Router();
import multer from "multer";

const base = "http://localhost:3001/";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/')
    },
    filename: function (req, file, cb) {
        const ext = file.originalname.split('.')
            .filter(Boolean) 
            .slice(1)
            .join('.')
        cb(null, Date.now() + "." + ext)
    }
})
const upload = multer({ storage: storage });

 /**
 * @swagger
 * tags:
 *   name: File
 *   description: The File API
 */

 /**
 * @swagger
 * /file:
 *   post:
 *     summary: Upload a file
 *     tags: [File]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Successful upload
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 */
router.post('/', upload.single("file"), function (req: any, res: any) {
    console.log("router.post(/file: " + base + req.file.path)
    res.status(200).send({ url: req.file.path })
});
export default router;