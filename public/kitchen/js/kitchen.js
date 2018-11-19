$(document).ready(function () {
  // Getting references to the name input and author container, as well as the table body

  var authorList = $("tbody");
  var authorContainer = $(".author-container");
  // Adding event listeners to the form to create a new object, and the button to delete
  // an Author

  $(document).on("click", ".delete-author", handleDeleteButtonPress);

  // Getting the initial list of Authors
  getReservation();


  // Function for creating a new list row for authors
  function createAuthorRow(reservationData) {
    var newTr = $("<tr>");
    newTr.data("reservation", reservationData);
    newTr.append("<td>" + reservationData.name + "</td>");
    newTr.append("<td>" + reservationData.id + "</td>");
    newTr.append("<td> " + reservationData.Orders.length + "</td>");
    newTr.append("<td><a href='/api/orders/" + reservationData.id + "'>List of Orders</a></td>");
    newTr.append("<td><a style='cursor:pointer;color:red' class='delete-author'>Delete Reservation</a></td>");
    return newTr;
  }

  // Function for retrieving authors and getting them ready to be rendered to the page
  function getReservation() {
    $.get("/api/reservations", function (data) {
     
      var rowsToAdd = [];
      
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createAuthorRow(data[i]));
      }
      renderAuthorList(rowsToAdd);

      console.log(rowsToAdd)
      
    });
  }

  // A function for rendering the list of authors to the page
  function renderAuthorList(rows) {
    authorList.children().not(":last").remove();
    authorContainer.children(".alert").remove();
    if (rows.length) {
      console.log(rows);
      authorList.prepend(rows);
    }
  }
  

  // Function for handling what happens when the delete button is pressed
  function handleDeleteButtonPress() {
    var listItemData = $(this).parent("td").parent("tr").data("reservation");
    var id = listItemData.id;
    $.ajax({
      method: "DELETE",
      url: "/api/reservations/" + id
    })
      .then(getReservation);
  }
});
