// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $(".devourUndevour").on("click", function (event) {
    let toggleDevoured = {
      devoured: Math.abs($(this).data('devoured') - 1)
    };

    // Send the PUT request.
    $.ajax(`/api/update-burger/${$(this).data('id')}`, {
      type: "PUT",
      data: toggleDevoured
    }).then(
      function() {
        console.log("Updated devoured state to", toggleDevoured);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".burgerForm").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var burger_name = {
      burger_name: $("#burger_name").val().trim(),
      devoured: $("[name=devoured]:checked").val().trim()
    };

    // Send the POST request.
    $.ajax("/api/new-burger", {
      type: "POST",
      data: burger_name,
    }).then(
      function() {
        console.log("created new burger");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".deleteBurger").on("click", function(event) {
    var id = $(this).data("id");

    // Send the DELETE request.
    $.ajax("/api/delete-burger/" + id, {
      type: "DELETE"
    }).then(
      function() {
        console.log("deleted burger", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
});
