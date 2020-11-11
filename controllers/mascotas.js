// const Mascota = require('../models/Mascota')

/*  Archivo controllers/usuarios.js
 *  Simulando la respuesta de objetos Usuario
 *  en un futuro aquí se utilizarán los modelos
 */

/*

function crearMascota(req, res) {
  // Instanciaremos un nuevo usuario utilizando la clase usuario
  var mascota = new Mascota(req.body)
  res.status(201).send(mascota)
}

function obtenerMascotas(req, res) {
  // Simulando dos usuarios y respondiendolos
  var mascota1 = new Mascota(1, 'Salchipulpo', 'Perro', 'https://i.pinimg.com/originals/fb/6d/16/fb6d16c4321ab45dad1c6290f2740f7a.jpg', 'perrita parece salchicha, solo para presumirla', 'Carmen', 'd.f')
  var mascota2 = new Mascota(2, 'Pekas, pecoso', 'perrote', 'https://huellitas.social/img/content/000015/735_perro-macho-medianopequeno-pecoso-cota_1000x666.jpg', 'perro pecoso,tampoco esta en adopción', 'carmen', 'd.f')
  res.send([mascota1, mascota2])
} */
const Usuario = require('../models/Mascota')

const mongoose = require('mongoose')
const Mascota = mongoose.model('Mascota')

function crearMascota(req, res, next) {
  var mascota = new Mascota(req.body)
  mascota.anunciante = req.usuario.id
  mascota.estado = 'disponible'
  mascota.save().then(mascota => {
    res.status(201).send(mascota)
  }).catch(next)
}

function obtenerMascotas(req, res, next) {
  if(req.params.id){
    Mascota.findById(req.params.id)
			.populate('anunciante', 'username nombre apellido bio foto').then(mascotas => {
	      res.send(mascotas)
	    }).catch(next)
  } else {
    Mascota.find().then(mascotas=>{
      res.send(mascotas)
    }).catch(next)
  }
}

//Mascota - Modificando Mascota:

function modificarMascota(req, res, next) {
  console.log("Mascota a modificar: " + req.params.id ); //req.param.id - Mascota en uri  
  Mascota.findById(req.params.id).then(mascota => { //Busca la mascota que se recibe como parámetro.    
  if (!mascota) { return res.sendStatus(401); }   //Si no se encuentra mascota, retorna estaus 401.---    let idUsuario=req.usuario.id;                   //User en JWT
    console.log("Usuario que modifica " + idUsuario);
    let idAnunciante=mascota.anunciante;
    console.log(" Anunciante mascota: " + idAnunciante);
    if( idUsuario == idAnunciante ){
      let nuevaInfo = req.body
      if (typeof nuevaInfo.nombre !== 'undefined')
        mascota.nombre = nuevaInfo.nombre
      if (typeof nuevaInfo.categoria !== 'undefined')
        mascota.categoria = nuevaInfo.categoria
      if (typeof nuevaInfo.fotos !== 'undefined')
        mascota.fotos = nuevaInfo.fotos
      if (typeof nuevaInfo.descripcion !== 'undefined')
        mascota.descripcion = nuevaInfo.descripcion
      if (typeof nuevaInfo.anunciante !== 'undefined')
        mascota.anunciante = nuevaInfo.anunciante
      if (typeof nuevaInfo.ubicacion !== 'undefined')
        mascota.ubicacion = nuevaInfo.ubicacion
      mascota.save().then(updatedMascota => {
        res.status(201).json(updatedMascota.publicData())
      }).catch(next)
    }
    else{
      return res.sendStatus(401);
    }
  }).catch(next)
}

function eliminarMascota(req, res) {
  // únicamente borra a su propio mascota obteniendo el id del token
  Mascota.findById(req.params.id)
  .then(mascota => {    if (!mascota) { return res.sendStatus(401); }    
  let idUsuario=req.usuario.id;
    console.log("Usuario que modifica " + idUsuario);
    let idAnunciante=mascota.anunciante;
    console.log(" Anunciante mascota: " + idAnunciante);    
    if( idUsuario == idAnunciante ){
      let nombreMascota = mascota.nombre;
      mascota.deleteOne();
      res.status(200).send(`Mascota ${req.params.id} eliminada. ${nombreMascota}`);
    }else{
      return res.sendStatus(401);
    }
  });
}

module.exports = {
  crearMascota,
  obtenerMascotas,
  modificarMascota,
  eliminarMascota
}