const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')

mongoose.plugin(slug);
const Schema = mongoose.Schema;

const MangaDetailsSchema = new Schema({
	tentruyen:{ type: String, default: ''},
	chapter: { type: String, default: ''},
	slug: { type: String, slug: 'chapter', unique: true },
},{
	timestamps: true,
});

module.exports = mongoose.model('Details_Manga', MangaDetailsSchema)