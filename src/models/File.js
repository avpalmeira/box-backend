const mongoose = require('mongoose');

const base_url = 'http://localhost:3333'; //HOST:PORT

// defining schema
const File = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        path: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    }
);

// define virtual attribute 'url'
File.virtual('url').get(function() {
    const url = process.env.URL || base_url;
    
    return `${url}/files/${encodeURIComponent(this.path)}`;
});

module.exports = mongoose.model('File', File);
