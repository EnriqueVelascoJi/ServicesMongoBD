const serviceModel = require('./serviceSchema');
const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    
    res.send("Prueba1");
});


//recover service list as a json format
router.get('/services/', async (req, res, next) => {

    try {
        await serviceModel.find({})
                .then(services => {
                    res.json(services);
                }).catch(err => {
                    res.json(err);
                });
        
    } catch (error) {
        console.log(error);
    }
});

//recover last service registered
router.get('/service/', async (req, res, next) => {

    try {
        
        await serviceModel.find({}).sort({_id: -1}).limit(1)
                .then( service => {
                    res.json(service);
                }).catch(err => {
                    res.json(err);
                });

    } catch (error) {
        console.log(error);
    }
});

//recover last n-services
router.get('/services/last/', async (req, res, next) => {

    const numberRecords = req.body.n;

    try {
        
        await serviceModel.find({}).sort({_id: -1}).limit(parseInt(numberRecords))
                .then( services => {
                    res.json(services);
                }).catch( err => {
                    res.json(err);
                });

    } catch (error) {
        console.log(error);
    }
});

//recover first service registered
router.get('/service/first/', async (req, res, next) => {

    try {
        
        await serviceModel.find({}).limit(1)
                .then( service => {
                    res.json(service);
                }).catch( err => {
                    res.json(err);
                });

    } catch (error) {
        console.log(error);
    }
});

//Create a new service
router.post('/service/create/', async (req, res, next) => {

    const { name, description, ip, port, ranking } = req.body;
    const newService = {
        name,
        description,
        ip,
        port,
        ranking
    };

    try {
        await serviceModel.create(
           newService
        ).then(service => {
            res.json(service);
        }).catch(err => {
            res.json(err);
        });     
    } catch (error) {
        console.log(error);
    }
});

//update a service
router.put('/service/update/', async (req, res, next) => {

    const { id, name, description, ip, port, ranking } = req.body;
    const newService = {
        name,
        description,
        ip,
        port,
        ranking
    };

    try {
        
        await serviceModel.findOneAndUpdate(
            {_id: id},
            newService,
            {new: true}

        ).then(service => {
            res.json(service);
        }).catch(err => {
            res.json(err);
        });
    } catch (error) {
        
        console.log(error);
    }
});

//delete a service
router.delete('/service/delete/' , async (req , res, next) =>{

   const id = req.body.id;

   try {
       
        await serviceModel.findOneAndDelete(
            {_id:id}
        ).then(mensaje => {
            res.json({
                mensaje
            }).catch(err => {
                res.json(err);
            });
        });
   } catch (error) {
       
        console.log(error);
   }

});

//recover all services with ip equal to
router.get('/service/retrieve_by_ip/', async (req, res, next) => {

    const ip = req.body.ip;
    try {
        
        await serviceModel.where({ip: ip})
                .find({})
                .then(services => {
                    res.json(services);
                }).catch(err => {
                    res.json(err);
                });
    } catch (error) {
        console.log(error);
    }
});

//recover all services with ip equal to and port equal to
router.get('/service/retrieve_by_ip_port/', async (req, res, next) => {

    const { ip, port } = req.body;
    try {
        
        await serviceModel.where({ip: ip, port: port})
                .find({})
                .then(services => {
                    res.json(services);
                }).catch(err => {
                    res.json(err);
                });
    } catch (error) {
        console.log(error);
    }
});

//recover all services with name equal to
router.get('/service/retrieve_by_name/', async (req, res, next) => {

    const name = req.body.name;
    try {
        
        await serviceModel.where({name})
                .find({})
                .then(services => {
                    res.json(services);
                }).catch(err => {
                    res.json(err);
                });
                
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;