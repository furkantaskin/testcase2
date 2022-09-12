const API_URL = "https://restcountries.com/v3.1/all";


async function fetchData() {
  const response = await fetch(API_URL);
  const countries = await response.json();
  return countries;
}

document.addEventListener("DOMContentLoaded", function () {
  let table = $("#countries").DataTable({
    dom: "Bfrtip",
    buttons: ["copyHtml5", "excelHtml5", "csvHtml5", "pdfHtml5"],
  });
  fetchData()
    .then((aggregatedData) => {
      aggregatedData.map((country) => {
        table.row
          .add([
            `<img src='${country.flags.png}' class='w-10 h-10 object-contain object-center' />`,
            country.name.common,
            country.capital?.toLocaleString('en-US') || '',
            country.population?.toLocaleString('en-US') || '',
            country.region?.toLocaleString('en-US') || '',
          ])
          .draw();
      });
    })
    .catch((error) => {
      console.log(error.message);
    });
});
