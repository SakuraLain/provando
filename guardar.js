
$(document).ready(function() {
  $('#extractButton').click(function() {
      var baseUrl = $('#urlInput').val();
      var extractedData = ''; // Variable para almacenar los datos extraídos de todas las páginas
      var totalPages = 20; // Número total de páginas a extraer
      var currentPage = 1;

      function extractData(url) {
          $.get(url, function(data) {
              var elements = $(data).find('pre'); // Busca todos los elementos <pre>
              elements.each(function(index, element) {
                  var paragraphs = $(element).find('p'); // Busca todos los elementos <p> dentro de cada <pre>
                  paragraphs.each(function(idx, para) {
                      extractedData += '<p>' + $(para).html() + '</p>';
                  });
              });

              if (currentPage < totalPages) {
                  currentPage++;
                  var nextUrl = baseUrl + '/page/' + currentPage;
                  extractData(nextUrl); // Llama recursivamente a la función para la próxima página
              } else {
                  $('#results').html(extractedData); // Mostrar todos los datos extraídos
              }
          });
      }

      extractData(baseUrl); // Llama a la función de extracción para la primera página
  });

  // Imprimir como PDF
  $('#printPdfButton').click(function() {
      var pdfContent = document.body.innerHTML;
      var originalContent = document.body.innerHTML;
      document.body.innerHTML = pdfContent;

      window.print();
      document.body.innerHTML = originalContent;
  });
});