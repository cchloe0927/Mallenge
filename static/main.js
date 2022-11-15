'use strict'

// $(document).ready(function () {
//     listing()
// })

//게시글 작성
function posting() {
    let challenge_img = $('#challenge_img')[0].files[0]
    let start_data = $("#start-data").val()
    let end_data = $("#end-data").val()
    let contents = $("#contents").val()
    let date = new Date().toISOString()
    let form_data = new FormData()

    form_data.append("challenge_img_give", challenge_img)
    form_data.append("start_data_give", start_data)
    form_data.append("end_data_give", end_data)
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