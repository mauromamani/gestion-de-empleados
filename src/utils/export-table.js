const exportar = (ar) => {
  if (window.Blob && (window.URL || window.webkitURL)) {
    var contenido = "",
      d = new Date(),
      blob,
      reader,
      save,
      clicEvent;
    //creamos contenido del archivo
    for (var i = 0; i < ar.length; i++) {
      //construimos cabecera del csv
      if (i == 0)
        contenido += Object.keys(ar[i]).join(";") + "\n";
      //resto del contenido
      contenido += Object.keys(ar[i]).map(function (key) {
        return ar[i][key];
      }).join(";") + "\n";
    }
    //creamos el blob
    blob = new Blob(["\ufeff", contenido], { type: 'text/csv' });
    //creamos el reader
    var reader = new FileReader();
    reader.onload = function (event) {
      //escuchamos su evento load y creamos un enlace en dom
      save = document.createElement('a');
      save.href = event.target.result;
      save.target = '_blank';
      //aquí le damos nombre al archivo
      save.download = "Tabla" + d.getDate() + "_" + (d.getMonth() + 1) + "_" + d.getFullYear() + ".csv";
      try {
        //creamos un evento click
        clicEvent = new MouseEvent('click', {
          'view': window,
          'bubbles': true,
          'cancelable': true
        });
      } catch (e) {
        //si llega aquí es que probablemente implemente la forma antigua de crear un enlace
        clicEvent = document.createEvent("MouseEvent");
        clicEvent.initEvent('click', true, true);
      }
      //disparamos el evento
      save.dispatchEvent(clicEvent);
      //liberamos el objeto window.URL
      (window.URL || window.webkitURL).revokeObjectURL(save.href);
    }
    //leemos como url
    reader.readAsDataURL(blob);
  } else {
    //el navegador no admite esta opción
    alert("Su navegador no permite esta acción");
  }
}
module.exports = {
  exportar
}