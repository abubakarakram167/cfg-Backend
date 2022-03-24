/* Controller 1 */
const path = require('path');
const os = require('os');
const _ = require('lodash')
const mediaService = require('../dal/media.dao');
const sharp = require('sharp')
const thumb = require('node-video-thumb')
const fs = require('fs')
const S3FS = require('s3fs')
const s3fsImpl = new S3FS('cfg-media', {
    accessKeyId: 'AKIAJQ6EIVYF3SRK6UMQ',
    secretAccessKey: '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',
    signatureVersion: 'v4',
    region: 'us-east-2'

});
const { Op } = require('sequelize');

module.exports = {
    createOneMedia,
    getOneMediaByID,
    getListMediaMultiple,
    deleteMedia,
    editMedia,
    getCloudFrontUrl,
    createSignedUrl
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

async function createSignedUrl(url){

    var cfUtil = require('aws-cloudfront-sign');

    // Sample private key. This would need to be replaced with the private key from
    // your CloudFront key pair.
    var cfPk = Buffer.from(process.env.CF_PRIVATE_KEY, 'base64');
    // Sample key pair ID. This would need to be replaced by the Access Key ID from
    // your CloudFront key pair.
    var cfKeypairId = 'K30S0N0WWH7I01';
    var cfURL = `https://du1jzqmqkepz6.cloudfront.net/${url}`;

    var signedUrl = cfUtil.getSignedUrl(cfURL, {
        keypairId: cfKeypairId,
        expireTime: Date.now() + (50 * 60 * 1000),
        privateKeyString: cfPk
    });
    return signedUrl;

}




async function createOneMedia(req, res) {
    const reqObj = req.body;
    const thumbDir = '../../static/thumbnails/';
    //console.log(reqObj);
    const { user } = req;
    const mediaFiles = req.files;
    const category = reqObj.category ? reqObj.category : 'general';
    let mediaResponse = {};
    let insertObject = [];
    for (let file of mediaFiles) {
        let mediaObject = {};
        file.filename = _.replace(file.filename, ' ', '_');
        mediaObject.title = file.originalname;
        mediaObject.mime_type = file.mimetype.split('/')[1];
        mediaObject.url = file.path;
        mediaObject.is_global = true;
        mediaObject.created_by = user.id;
        mediaObject.created_at = new Date();
        mediaObject.file_name = file.filename;
        mediaObject.category = category;
        insertObject.push(mediaObject);
        if (fs.existsSync(path.join(__dirname, `../../static/${file.filename}`))) {
            fs.appendFile(path.join(__dirname, '../../static/s3-log.txt'), `${file.filename} exists before sharp, ${os.EOL}`, err => {
                if (err) {
                    console.error(err)
                    return
                }
            })
        }
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
            await sharp(file.path).resize(200, 200).toFile(path.join(__dirname, thumbDir + file.filename), (err, resizeImage) => {
                if (err) {
                    console.log(err);
                }
            });
        }
        // if (file.mimetype === 'video/mp4' || file.mimetype === 'video/mkv') {
        //     const options = {
        //         source: file.path,
        //         target: path.join(__dirname, thumbDir + file.filename + '.png'),
        //         width: 200,   // thumb's width
        //         height: 200,   // thumb's height
        //         seconds: 2    // seconds from start
        //     }
        //     await thumb(options)
        // }
        if (fs.existsSync(path.join(__dirname, `../../static/${file.filename}`))) {
            fs.appendFile(path.join(__dirname, '../../static/s3-log.txt'), `${file.filename} exists before uploading, ${os.EOL}`, err => {
                if (err) {
                    console.error(err)
                    return
                }
            })
        }
        var stream = fs.createReadStream(file.path);
        
        
        s3fsImpl.writeFile(file.filename, stream).then(function () {
            console.log("uploaded to s3");
            fs.appendFile(path.join(__dirname, '../../static/s3-log.txt'), `${file.filename} uploaded, ${os.EOL}`, err => {
                if (err) {
                    console.error(err)
                    return
                }
                //done!
            })
            // fs.unlink(file.path, function (err) {
            //     if (err) {
            //         console.error(err);
            //     }
            // });
            // res.status(200).end();
        }).catch(function (err) {
            console.log("err occured on s3", err);
            fs.appendFile(path.join(__dirname, '../../static'), `${file.filename}.pdf failed, ${os.EOL} , ${err} `, err => {
                if (err) {
                    console.error(err)
                    return
                }
                //done!
            })
        })

        let thumbStream = fs.createReadStream(path.join(__dirname, thumbDir + file.filename))

        s3fsImpl.writeFile(`/thumbnails/${file.filename}`, thumbStream).then(function () {
            console.log("uploaded to s3 thumb");
            fs.appendFile(path.join(__dirname, '../../static/s3-log.txt'), `${file.filename} uploaded, ${os.EOL}`, err => {
                if (err) {
                    console.error(err)
                    return
                }
                //done!
            })
            // fs.unlink(file.path, function (err) {
            //     if (err) {
            //         console.error(err);
            //     }
            // });
            // res.status(200).end();
        }).catch(function (err) {
            console.log("err occured on s3  thumb", err);
            fs.appendFile(path.join(__dirname, '../../static'), `${file.filename}.pdf failed, ${os.EOL} , ${err} `, err => {
                if (err) {
                    console.error(err)
                    return
                }
                //done!
            })
        })


    }

    //console.log(insertObject);
    let media = await insertMedia(insertObject);

    //console.log(req.files);
    res.send(media);
}

async function getOneMediaByID(req, res) {
    const id = req.params.id;
    const media = await getByIDMedia({ where: { id } });
    // let file_path = path.join(__dirname, '../../static', media.file_name)
    // console.log(media.file_name)
    s3fsImpl.createReadStream(media.file_name, { encoding: 'base64' }).pipe(res);
    //await s3fsImpl.readFile(media.file_name, { encoding: 'base64' }).createReadStream().pipe(res);
    //.then(function (file) {
    //     console.log("downloaded from s3");
    //     // fs.unlink(file.path, function (err) {
    //     //     if (err) {
    //     //         console.error(err);
    //     //     }
    //     // });
    //     // res.status(200).end();
    //     //console.log(file);
    //     //let str = file.Body.toString('base64')
    //     res.writeHead(200, { 'Content-Type': 'image/jpeg' });
    //     res.write(file.Body, 'binary');
    //     res.end(null, 'binary');
    //     //res.send(str);
    // }).catch(function (err) {
    //     console.log("err occured on s3");
    //     res.status(504).send({ message: err.message })
    // })

}

async function getListMediaMultiple(_req, res) {
    let media = await findAllMedia({
        where: {
            category: {
                [Op.notIn]: ['profile', 'cover']
            }
        },
        attributes: ['id', 'file_name', 'title', 'description', 'category', 'created_by', 'created_at']
    });

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


async function editMedia(req, res) {
    let reqObj = req.body;
    reqObj.mime_type === undefined ? null : delete reqObj.mime_type
    reqObj.url === undefined ? null : delete reqObj.url
    reqObj.file_name === undefined ? null : delete reqObj.file_name
    reqObj.created_by === undefined ? null : delete reqObj.created_by
    reqObj.created_at === undefined ? null : delete reqObj.created_at

    reqObj.updated_at = new Date();

    let id = Number(req.params.id);

    let updateResponse = await mediaService.update(reqObj, { where: { id: id } })
    if (updateResponse[0] > 0) {
        return res.send({ message: "Record Successfully Updated" });
    }
    res.send({ message: "Record Update Error" });
}

async function getCloudFrontUrl(req, res) {
    const { url } = req.params;
    
    
    let signedUrl = await createSignedUrl(url);
    console.log(signedUrl);
    res.send(signedUrl);

}

