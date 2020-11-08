/*  Archivo controllers/usuarios.js
 *  Simulando la respuesta de objetos Usuario
 *  en un futuro aquí se utilizarán los modelos
 */

/*const Mascota = require('../models/Mascota')

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
}

function modificarMascota(req, res) {
  // simulando un usuario previamente existente que el usuario utili
  var mascota1 = new Mascota(req.params.id, 'Salchipulpo', 'Perro', 'https://i.pinimg.com/originals/fb/6d/16/fb6d16c4321ab45dad1c6290f2740f7a.jpg', 'perrita parece salchicha, solo para presumirla', 'Carmen', 'd.f')
  var modificaciones = req.body
  mascota1 = { ...mascota1, ...modificaciones }
  res.send(mascota1)
}

function eliminarMascota(req, res) {
  res.status(200).send(`Mascota ${req.params.id} eliminado`);
}

module.exports = {
  crearMascota,
  obtenerMascotas,
  modificarMascota,
  eliminarMascota
}*/

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
