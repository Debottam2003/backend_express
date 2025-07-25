import express from 'express';
import {getuser, setuser} from '../controllers/usercontroller.js';

const router = express.Router();

router.use(express.json());
// router.use(express.urlencoded({extended: true}));
router.route('/getuser').get(getuser);
router.route('/setuser').post(express.urlencoded({extended: true}), setuser);

export default router;