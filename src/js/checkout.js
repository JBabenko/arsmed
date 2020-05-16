$(document).ready(function() {
  $(".js-checkout-form").submit(submitCheckoutForm);
});

function submitCheckoutForm(e) {
  e.preventDefault();
  $.ajax({
    type: "POST",
    url: "/checkout.php",
    data: $(".js-checkout-form").serialize(),
    success: function(data) {
        $(".result").html(data);
    }
  });
}
