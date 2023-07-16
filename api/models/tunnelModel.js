const MongooseDelete = require('mongoose-delete')
const { Schema, model, connect } = require('mongoose')

const TunnelSchema = new Schema({
	comment: { type: String, required: true },
	tags: { type: Array, required: true }
})

TunnelSchema.plugin(MongooseDelete, { deletedAt: true, overrideMethods: true })

module.exports = model('Tunnel', TunnelSchema)