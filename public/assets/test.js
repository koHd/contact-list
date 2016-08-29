$.ajax({
  url: "http://localhost:8000/users/",
  dataType: "json",
  type: "GET",
  success : function(users) {
    console.log(users[0].username);
  }
});
