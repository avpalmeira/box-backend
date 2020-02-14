const mongoose = require('mongoose');

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
    const url = process.env.URL || process.env.DEV_URL;
    
    return `${url}/file/${encodeURIComponent(this.path)}`;
});

module.exports = mongoose.model('File', File, 'file');
