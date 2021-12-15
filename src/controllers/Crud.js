// this contains all basic CRUD endpoints on a schema

// the schema is supplied by injection
class CrudController {
    constructor(model) {
        this.model = model
    }

    // we HAVE to use lambda functions here, as they have
    // lexical scope for 'this'
    create = async (req, res, next) => {
        const entity = new this.model(req.body)
        await entity.save()
        res.status(201).json({
            id: entity.id
        })
    }

    getAll = async (req, res, next) => {
        const entities = await this.model.find()
        res.status(200).send(entities)
    }

    getOne = async (req, res, next) => {
        const entity = await this.model.findById(req.params.id)
        res.status(200).send(entity)
    }


    update = async (req, res, next) => {
        await this.model.findByIdAndUpdate(req.params.id, req.body) 
        res.status(200).json({id: req.body._id}).end()
    }



    delete = async (req, res, next) => {
        // this happens in two steps to make mongoose middleware run
        const entity = await this.model.findById(req.params.id)
        await entity.delete()
        res.status(204).end()
    }

    
}

module.exports = CrudController