const Truyen = require('../models/Truyen')
const express = require('express')
const path = require('path')
const app = express()

const multer = require('multer')
const bodyParser = require('body-parser')
app.use(express.static(path.join(__dirname, 'public')))

const { multipleMongooseToOject } = require('../../ultil/mongoose')
const { mongooseToOject } = require('../../ultil/mongoose')

class AdminController{
    
    index(req,res,next){     
        res.render('admin/interface-admin')
    }


    createManga(req, res, next){
        res.render('admin/create-manga')
    }

    //[POST]
    create(req, res, next){
        const manga = new Truyen({
            tentruyen: req.body.nameManga,
            tenloai: req.body.abc,
            theloai: req.body.category,
            mota: req.body.description,
            hinh: req.file.filename,
        })
        manga.save(function(err){
            if(err){
                res.json({'kq': 0, 'errMess':err})
            }
            else{
                return res.redirect('/admin/manga');
            }
        })
    }

    manga(req, res, next){
        Truyen.find({})
            .then(mangas => {
                res.render('admin/manga', {
                    mangas: multipleMongooseToOject(mangas)
                })
            })
            .catch(next)   
    }

    infoManga(req, res, next){
        Truyen.findOne({ slug: req.params.slug })
            .then(truyen => {
                res.render('admin/details-manga', {truyen: mongooseToOject(truyen)})
            })
            .catch(next)
    }

    createChapterManga(req,res,next){
        Truyen.findOne({ slug: req.params.slug })
        .then(truyen => {
            res.render('admin/create-chapter-manga', {truyen: mongooseToOject(truyen)})
        })
        .catch(next)
    }

    createChapter(req, res, next){
        const files = req.files
        if(!files){
            res.send('Upload ko thành công')
        }
        else{
            res.json(files)
        }
    }

}

module.exports = new AdminController()
