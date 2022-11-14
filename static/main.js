'use strict'


$(document).ready(function () {
    listing()
})

//게시글 작성
function posting() {
    let contents = $("#textarea-contents").val()
    let place_pic = $('#place-pic')[0].files[0]
    let date = new Date().toISOString()

    let form_data = new FormData()

    form_data.append("place_pic_give", place_pic)
    form_data.append("contents_give", contents)
    form_data.append("date_give", date)

    $.ajax({
        type: "POST",
        url: "/posting",
        data: form_data,
        cache: false,
        contentType: false,
        processData: false,
        success: function (response) {
            alert(response["msg"])
            window.location.reload()
        }
    });
}