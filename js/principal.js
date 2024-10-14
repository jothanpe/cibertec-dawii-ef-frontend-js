window.addEventListener("load", function () {
    // referenciar controles de pantalla
    const msgSuccess = this.document.getElementById("msgSuccess");
  
    // recuperar nombre de usuario
    const result = JSON.parse(this.localStorage.getItem("result"));
    const btnCerrarSesion = this.document.getElementById("cerrarSesion");
    btnCerrarSesion.addEventListener("click", closeSession);
    // mostrar nombre de usuario en alerta
    mostrarAlerta(`Bienvenido ${result.nombreUsuario}`);
  });
  
  
  async function closeSession() {
    console.log("cerrando sesion");
    const request = {
      nombreUsuario: getUsers().nombreUsuario,
      correoUsuario: getUsers().correoUsuario,
    };
    const url = "http://localhost:8082/loginfeign/logout-async";
  
    console.log("request: ", request);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const result = await response.json();
    console.log("Respuesta del servidor: ", result);
    localStorage.removeItem("result");
    window.location.replace("index.html");
  
  }
  
  function getUsers() {
    const result = JSON.parse(localStorage.getItem("result"));
    if (!result) window.location.replace("index.html");
    return result;
  }
  function mostrarAlerta(mensaje) {
    msgSuccess.innerHTML = mensaje;
    msgSuccess.style.display = "block";
  }
  

//const url = 'http://localhost:8082/loginfeign/logout-async';