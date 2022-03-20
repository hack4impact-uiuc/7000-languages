module.exports.POST_SIMPLE_COURSE = {
    approved: true,
    details: { 
        name: "Learning 101",
        description: "hii",
        translated_language: "English",
        location: "Michigan",
        iso: "153",
    }
}

module.exports.POST_SIMPLE_COURSE_EXPECTED = this.POST_SIMPLE_COURSE;

module.exports.POST_MISSING_FIELD_COURSE = {
    approved: true,
    details: {
        description: "hii",
        translated_language: "English",
        location: "Michigan",
        iso: "153",
    }
}

module.exports.POST_MISSING_FIELD_COURSE_EXPECTED = {
    approved: true,
    details: {
        name: "",
        description: "hii",
        translated_language: "English",
        location: "Michigan",
        iso: "153",
    }
}

module.exports.POST_WRONG_COURSE_MISSING_ISO = {
    approved: true,
    details: { 
        name: "Learning 101",
        description: "hii",
        translated_language: "English",
        location: "Michigan",
    }
}

module.exports.POST_COURSE_ADDITIONAL_FIELDS = {
    approved: true,
    details: { 
        name: "Learning 101",
        description: "hii",
        translated_language: "English",
        location: "Michigan",
        iso: "153",
        more_details: "best course",
    }
}

module.exports.POST_COURSE_ADDITIONAL_FIELDS_EXPECTED = this.POST_SIMPLE_COURSE;