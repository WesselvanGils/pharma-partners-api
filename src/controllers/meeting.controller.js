const CrudController = require("./Crud")

class MeetingController extends CrudController
{
    getAll()
    getAll = async (req, res, next) => {
        const entities = await this.model.find({ employee: { $eq: _id } })
        entities.map(entities => entities).sort();
        res.status(200).send(entities)
    }
}

// Equivalent to `{ rank: 'Lieutenant' }`. `$eq` is an example of
// a "query operator"
const docs = await Character.find({ rank: { $eq: 'Lieutenant' } });

docs.map(doc => doc.name).sort(); // ['Geordi La Forge', 'Worf']