class MeetingController
{
	constructor(model) 
	{
		this.model = model
	}

	getAll = async (req, res, next) => 
	{
		const entities = await this.model.find({ employee: { $eq: req.params.id } })
		entities.map(entities => entities.meeting.start).sort();
		res.status(200).send(entities)
	}
}

module.exports = MeetingController