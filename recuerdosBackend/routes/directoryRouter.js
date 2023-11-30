import { Router } from "express";
import getDirectorychildren from "../controllers/diretory/getDirectoryChildren.js";
import createDirectory from "../controllers/diretory/createDirectory.js";
import authorization from "../middleware/authorization.js";

const directoryRouter = Router()


directoryRouter.get('/getChildren/:directoryID', authorization, getDirectorychildren);
directoryRouter.post('/create', authorization, createDirectory);



export default directoryRouter