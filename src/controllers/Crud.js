// this contains all basic CRUD endpoints on a schema
const SplunkLogger = require("splunk-logging/splunklogger");
const authcontroller = require("../controllers/authentication.controller")
const splunkconfig = require("../configuration/splunk.config")

var configo = {
    token: splunkconfig.key,
    url: splunkconfig.url,
    batchInterval: 1000,
    maxBatchCount: 10,
    maxBatchSize: 1024 // 1kb
	// Enable SSL certificate validationLogger.requestOptions.strictSSL = true;
};
// Enable SSL certificate 


var Logger = new SplunkLogger(configo)
Logger.requestOptions.strictSSL = true;

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
        res.status(201).json(entity)

        // authcontroller.getEmployeeFromToken(req, res, next, (error, result) => {
        //     if (error) {
        //         console.log(error)
        //     } else {
        //         var payload = {
        //             message : {
        //                 entity: entity,
        //                 employee: result,
        //                 method: "create"
        //             }
                
        //         }
        //         Logger.send(payload)
        //     }
        // })
    }

    getAll = async (req, res, next) => {
        const entities = await this.model.find()
        res.status(200).send(entities)

        // authcontroller.getEmployeeFromToken(req, res, next, (error, result) => {
        //     if (error) {
        //         console.log(error)
        //     } else {
        //         var payload = {
        //             message : {
        //                 entities: entities,
        //                 employee: result,
        //                 method: "getAll"
        //             }
                
        //         }
        //         Logger.send(payload)
        //     }
        // })
    }

    getBatch = async (req, res) =>
    {
        const startIndex = req.params.batch * req.params.amount
        let entities = await this.model.find()
        let response = []

        await entities.sort((a, b) => {return a.patientNumber - b.patientNumber})
        await entities.slice(startIndex, startIndex + req.params.amount).map(item =>
        {
            response.push(item)
        })
        res.status(200).send(response)
    }

    getOne = async (req, res, next) => {
        const entity = await this.model.findById(req.params.id)
        res.status(200).send(entity)

        // authcontroller.getEmployeeFromToken(req, res, next, (error, result) => {
        //     if (error) {
        //         console.log(error)
        //     } else {
        //         var payload = {
        //             message : {
        //                 entity: entity,
        //                 employee: result,
        //                 method: "getOne"
        //             }
                
        //         }
        //         Logger.send(payload)
        //     }
        // })
    }


    update = async (req, res, next) => {
        await this.model.findByIdAndUpdate(req.params.id, req.body) 
        res.status(200).json({id: req.body._id}).end()

        // authcontroller.getEmployeeFromToken(req, res, next, (error, result) => {
        //     if (error) {
        //         console.log(error)
        //     } else {
        //         var payload = {
        //             message : {
        //                 entity: req.body,
        //                 employee: result,
        //                 method: "update"
        //             }
                
        //         }
        //         Logger.send(payload)
        //     }
        // })
    }



    delete = async (req, res, next) => {
        // this happens in two steps to make mongoose middleware run
        const entity = await this.model.findById(req.params.id)
        await entity.delete()
        res.status(204).end()

        // authcontroller.getEmployeeFromToken(req, res, next, (error, result) => {
        //     if (error) {
        //         console.log(error)
        //     } else {
        //         var payload = {
        //             message : {
        //                 entity: entity,
        //                 employee: result,
        //                 method: "delete"
        //             }
                
        //         }
        //         Logger.send(payload)
        //     }
        // })
    }

    
}

module.exports = CrudController