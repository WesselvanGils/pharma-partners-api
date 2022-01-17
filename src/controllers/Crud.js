// this contains all basic CRUD endpoints on a schema
const SplunkLogger = require("splunk-logging/splunklogger");
const authcontroller = require("../controllers/authentication.controller")
const splunkconfig = require("../configuration/splunk.config")

var configo = {
    token: splunkconfig.key,
    url: splunkconfig.url,
    batchInterval: 1000,
    maxBatchCount: 1,
    maxBatchSize: 1024 // 1kb
	// Enable SSL certificate validationLogger.requestOptions.strictSSL = true;
};
// Enable SSL certificate 


var Logger = new SplunkLogger(configo)
Logger.requestOptions.strictSSL = true;

// ik wil een commit maken

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

        authcontroller.getEmployeeFromToken(req, res, next, (error, result) => {
            if (error) {
                console.log(error)
            } else {
                var payload = {
                    message : {
                        entity: entity,
                        employee: result,
                        method: "create",
                        event: "Sourcetype test please",
                        sourcetype: "testsystem",
                        host: "some-host-123",
                        fields: {"tracking_id": 1234}
                    }
                
                }
                console.log(payload)
                Logger.send(payload)
            }
        })
    }

    getAll = async (req, res, next) => {
        const entities = await this.model.find()
        res.status(200).send(entities)

        authcontroller.getEmployeeFromToken(req, res, next, (error, result) => {
            if (error) {
                console.log(error)
            } else {
                var payload = {
                    message : {
                        entities: entities,
                        employee: result,
                        method: "getAll"
                    }
                
                }
                Logger.send(payload)
            }
        })
    }

    getOne = async (req, res, next) => {
        const entity = await this.model.findById(req.params.id)
        res.status(200).send(entity)

        authcontroller.getEmployeeFromToken(req, res, next, (error, result) => {
            if (error) {
                console.log(error)
            } else {
                var payload = {
                    message : {
                        entity: entity,
                        employee: result,
                        method: "getOne"
                    }
                
                }
                Logger.send(payload)
            }
        })
    }


    update = async (req, res, next) => {
        await this.model.findByIdAndUpdate(req.params.id, req.body) 
        res.status(200).json({id: req.body._id}).end()

        authcontroller.getEmployeeFromToken(req, res, next, (error, result) => {
            if (error) {
                console.log(error)
            } else {
                var payload = {
                    message : {
                        entity: req.body,
                        employee: result,
                        method: "update"
                    }
                
                }
                Logger.send(payload)
            }
        })
    }



    delete = async (req, res, next) => {
        // this happens in two steps to make mongoose middleware run
        const entity = await this.model.findById(req.params.id)
        await entity.delete()
        res.status(204).end()

        authcontroller.getEmployeeFromToken(req, res, next, (error, result) => {
            if (error) {
                console.log(error)
            } else {
                var payload = {
                    message : {
                        entity: entity,
                        employee: result,
                        method: "delete"
                    }
                
                }
                Logger.send(payload)
            }
        })
    }

    
}

module.exports = CrudController