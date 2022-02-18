const mongoose = require('mongoose');

const Course = new mongoose.Schema({
    approved: { type: Boolean, required: true },
    _admin_id: { type: String, required: true },
    details: { type: CourseDetails, required: true},
});

const CourseDetails = new mongoose.Schema({
    language_name: { type: String, required: false, default: "" },
    language_description: { type: String, required: false, default: "" },
    population_size: { type: Number, required: false, default: "" },
});

const Unit = new mongoose.Schema({
    _course_id: { type: String, required: true },
    name: { type: String, required: true },
    order: { type: Number, required: true },
    selected: { type: Boolean, required: true },
});

const Lesson = new mongoose.Schema({
    _course_id: { type: String, required: true },
    _unit_id: { type: String, required: true },
    name: { type: String, required: true },
    order: { type: Number, required: true },
    selected: { type: Boolean, required: true },    
    vocab: { type: [Vocab], required: true, default: [] },
});

const Vocab = new mongoose.Schema({
    order: { type: Number, required: true },
    original: { type: String, required: true },
    translation: { type: String, required: true },
    image: { type: String, required: false, default: "" },    
    audio: { type: String, required: false, default: "" },
});

module.exports.Course = mongoose.model('Course', Course);
module.exports.CourseDetails = mongoose.model('CourseDetails', CourseDetails);
module.exports.Unit = mongoose.model('Unit', Unit);
module.exports.Lesson = mongoose.model('Lesson', Lesson);
module.exports.Vocab = mongoose.model('Vocab', Vocab);
