const mongoose = require('mongoose');

const base_url = 'http://localhost:3333';

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

File.virtual('url').get(function() {
    return `${base_url}/files/${encodeURIComponent(this.path)}`;
});

module.exports = mongoose.model('File', File);
