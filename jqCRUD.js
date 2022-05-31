$(function () {
  loadScholarships();
  $(".scholarships").on("click", ".btn-outline-danger", handleDelete);
  $("#addBtn").click(addScholarship);
  $(".scholarships").on("click", ".btn-outline-warning", handleUpdate);
  $("#updateBtn").click(function () {
    var id = $("#updateId").val();
    var title = $("#updateTitle").val();
    var description = $("#updateDescription").val();
    var amount = $("#updateAmount").val();
    var date = $("#updateDate").val();
    var link = $("#updateLink").val();

    $.ajax({
      url:
        "https://scholarships-api-assign-2.herokuapp.com/api/scholarships/" + id,
      method: "PUT",
      data: { title, description, amount, date, link },
      success: function () {
        $("#updateModal").modal("hide");
        loadScholarships();
      },
    });
  });
});

function loadScholarships() {
  $.ajax({
    url: "https://scholarships-api-assign-2.herokuapp.com/api/scholarships",
    method: "GET",
    success: function (response) {
      $(".scholarships").empty();
      for (var i = 0; i < response.length; i++) {
        $(".scholarships").append(`
        <div class="scholarship col-sm-12 col-md-6 col-lg-4 my-3 px-3" data_id="${response[i]._id}">
        <div class="card">
    <img class="card-img-top" src="./prod.jpg" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${response[i].title}</h5>
      <p class="card-text">${response[i].description}</p>
      <p class="card-text text-blue font-weight-bold">Amount: $${response[i].amount}</p>
      <p class="card-text font-weight-bold">Last Date to Apply: ${response[i].date}</p>
      <p class="card-text font-weight-bold">Application Link: ${response[i].link}</p>
      
      <button type="button" class="btn btn-outline-warning">
      Edit
    </button>
      <button type="button" class="btn btn-outline-danger">
    Delete
  </button>
  
    </div>
  </div>
  </div>
        `);
      }
    },
  });
}

function handleDelete() {
  var id = $(this).closest(".scholarship").attr("data_id");
  console.log(id);
  $.ajax({
    url:
      "https://scholarships-api-assign-2.herokuapp.com/api/scholarships/" + id,
    method: "DELETE",
    success: function () {
      loadScholarships();
    },
  });
}

function addScholarship() {
  var title = $("#title").val();
  var description = $("#description").val();
  var amount = $("#amount").val();
  var date = $("#date").val();
  var link = $("#link").val();
  $.ajax({
    url: "https://scholarships-api-assign-2.herokuapp.com/api/scholarships",
    method: "POST",
    data: { title, description, amount, date, link },
    success: function () {
      loadScholarships();
      $("#addingModal").modal("hide");
      $("#title").val("");
      $("#description").val("");
      $("#amount").val("");
      $("#date").val("");
      $("#link").val("");
    },
  });
}

function handleUpdate() {
  var id = $(this).closest(".scholarship").attr("data_id");
  $.ajax({
    url:
      "https://scholarships-api-assign-2.herokuapp.com/api/scholarships/" + id,
    method: "GET",
    success: function (response) {
      $("#updateId").val(response._id);
      $("#updateTitle").val(response.title);
      $("#updateDescription").val(response.description);
      $("#updateAmount").val(response.amount);
      $("#updateDate").val(response.date);
      $("#updateLink").val(response.link);
    },
  });
  $("#updateModal").modal("show");
}
