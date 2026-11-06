"use strict";

/* Botón que muestra una alerta */
var botonSaludo = document.getElementById("boton-saludo");
if (botonSaludo) {
  botonSaludo.addEventListener("click", function () {
    alert("HOLA MUNDO");
  });
}

/* Formulario: validación con mensajes de texto */
var form = document.getElementById("form-contacto");
if (form) {
  form.noValidate = true;
  var estado = document.getElementById("estado");
  var reglas = {
    nombre: function (v) { return v.trim() === "" ? "Escribe tu nombre." : ""; },
    correo: function (v) {
      if (v.trim() === "") { return "Escribe tu correo electrónico."; }
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "El correo debe tener el formato nombre@dominio.com.";
    },
    mensaje: function (v) { return v.trim().length < 10 ? "El mensaje debe tener al menos 10 caracteres." : ""; }
  };
  var validar = function (campo) {
    var msg = reglas[campo.name](campo.value);
    document.getElementById("error-" + campo.name).textContent = msg;
    campo.setAttribute("aria-invalid", msg ? "true" : "false");
    return msg === "";
  };
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var primerError = null;
    Object.keys(reglas).forEach(function (n) {
      if (!validar(form.elements[n]) && !primerError) { primerError = form.elements[n]; }
    });
    if (primerError) {
      estado.textContent = "";
      primerError.focus();
    } else {
      estado.textContent = "Mensaje enviado correctamente. Gracias.";
      form.reset();
    }
  });
}
