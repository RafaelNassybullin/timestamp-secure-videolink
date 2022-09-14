import express from 'express';
import Service from '../service';

const router = express.Router();

router.get('/assets/images/:id', Service.getImage);
router.get('/assets/videos/:id', Service.getVideo);
router.get('/getaAllVideos', Service.getAllVideo);
router.get('/getVideoId/:id', Service.getVideoId);
router.post('/savevideo', Service.saveVideo);
router.delete('/deleteVideo/:id', Service.deleteVideo);
router.get("/generateTimeLink", Service.generateTimeLink);
router.get("/deletelink", Service.deleteExpiredLink);

export = router;