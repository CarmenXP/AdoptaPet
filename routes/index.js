/*var router = require('express').Router();

router.get('/', (req, res)=>{
  res.send('welcome to adoptapet api');
});

const {
    crearUsuario,
    obtenerUsuarios,
    modificarUsuario,
    eliminarUsuario
  } = require('../controllers/usuarios')

  router.get('/usuarios', obtenerUsuarios)
  router.post('/usuarios', crearUsuario)
  router.put('/usuarios/:id', modificarUsuario)
  router.delete('/usuarios/:id', eliminarUsuario)
*/

var router = require('express').Router();

​router.get( '/', (req,res)=>{
  res.send('welcome to adoptapet api');
});
router.use('/usuarios', require('./usuarios'));

​const {	
  crearMascota,
	obtenerMascotas,
	modificarMascota,
	eliminarMascota
} = require('../controllers/mascotas')

router.get('/mascotas', obtenerMascotas)
router.post('/mascotas', crearMascota)
router.put('/mascotas/:id', modificarMascota)
router.delete('/mascotas/:id', eliminarMascota)

​const {	
	crearSolicitud,
	obtenerSolicitudes,
	modificarSolicitud,
	eliminarSolicitud,
	obtenerSolicitud
} = require('../controllers/solicitudes')

​
router.get('/solicitudes', obtenerSolicitudes)
router.get('/solicitudes/:id', obtenerSolicitud)
router.post('/solicitudes', crearSolicitud)
router.put('/solicitudes/:id', modificarSolicitud)
router.delete('/solicitudes/:id', eliminarSolicitud)

​module.exports = router;	   

