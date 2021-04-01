/* Controller 1 */
const path = require('path');
const mediaService = require('../dal/media.dao');
const sharp = require('sharp')
const thumb = require('node-video-thumb')
const fs = require('fs')

module.exports = {
    createOneMedia,
    getOneMediaByID,
    getListMediaMultiple,
    deleteMedia,

};
async function insertMedia(mediaData) {
    const media = mediaData;
    const mediaDb = await mediaService.addMany(media);


    return mediaDb;
}
async function getByIDMedia(mediaData) {
    const media = { ...mediaData };
    const mediaDb = await mediaService.getOneByID(media);
    const mediaRaw = await mediaDb.get({ plain: true });

    return mediaRaw;
}

async function findAllMedia(options) {
    const mediaDb = await mediaService.getList(options);
    return mediaDb;
}




async function createOneMedia(req, res) {
    const reqObj = req.body;
    const { user } = req;
    const mediaFiles = req.files;

    let mediaResponse = {};
    let insertObject = [];
    mediaFiles.forEach(file => {
        let mediaObject = {};
        mediaObject.title = file.originalname;
        mediaObject.mime_type = file.mimetype.split('/')[1];
        mediaObject.url = file.path;
        mediaObject.is_global = true;
        mediaObject.created_by = user.id;
        mediaObject.created_at = new Date();
        mediaObject.file_name = file.filename;
        insertObject.push(mediaObject);
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
            sharp(file.path).resize(200, 200).toFile(path.join(__dirname, '../../static/thumbnails/' + file.filename), (err, resizeImage) => {
                if (err) {
                    console.log(err);
                }
            });
        }
        if (file.mimetype === 'video/mp4' || file.mimetype === 'video/mkv') {
            const options = {
                source: file.path,
                target: path.join(__dirname, '../../static/thumbnails/' + file.filename + '.png'),
                width: 200,   // thumb's width
                height: 200,   // thumb's height
                seconds: 2    // seconds from start
            }
            thumb(options)
        }

    })
    let media = await insertMedia(insertObject);

    //console.log(req.files);
    res.send(media);
}

async function getOneMediaByID(req, res) {
    const id = req.params.id;
    const media = await getByIDMedia({ where: { id } });
    let file_path = path.join(__dirname, '../../static', media.file_name)
    console.log(media.file_name)
    res.sendFile(file_path);
}

async function getListMediaMultiple(_req, res) {
    let media = await findAllMedia({ attributes: ['id', 'file_name'] });
    media.forEach(media => {
        media.file_name = media.file_name.split('Z-')[1];
    })
    res.send(media);
}

async function deleteMedia(req, res) {
    let id = req.params.id;
    let media = "";
    try {
        media = await getByIDMedia({ where: { id } });
    } catch (error) {

        return res.status(401).send({ message: 'Media not found', error: error });
    }


    if (media.mime_type === 'png' || media.mime_type === 'jpeg') {

        fs.unlink(path.join(__dirname, '../../static/thumbnails/' + media.file_name), (err) => {
            if (err) {
                console.error(err)
                return
            }
        })

        fs.unlink(path.join(__dirname, '../../static/' + media.file_name), (err) => {
            if (err) {
                console.error(err)
                return
            }
        })
        
    }
    if (media.mime_type === 'mp4' || media.mime_type === 'mkv') {

        fs.unlink(path.join(__dirname, '../../static/thumbnails/' + media.file_name + '.png'), (err) => {
            if (err) {
                console.error(err)
                return
            }
        })

        fs.unlink(path.join(__dirname, '../../static/' + media.file_name), (err) => {
            if (err) {
                console.error(err)
                return
            }
        })

    }


    const del_obj = await mediaService.deleteOne(req.params.id);
    if (del_obj === 1) {
        res.send({ message: "Media deleted successfully" });
    } else {
        res.send({ message: "Error Deleting Media" });
    }
    console.log(media);

}

