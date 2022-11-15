'use strict'

$(document).ready(function () {
    listing()
})

//챌린지 카드 포스팅
function posting() {
    let title = $("#title").val()
    let challenge_img = $('#challenge_img')[0].files[0]
    let start_date = $("#start-data").val()
    let end_date = $("#end-data").val()
    let content = $("#contents").val()
    let form_data = new FormData()

    form_data.append("title_give", title)
    form_data.append("challenge_img_give", challenge_img)
    form_data.append("start_date_give", start_date)
    form_data.append("end_date_give", end_date)
    form_data.append("content_give", content)

    console.log(title, challenge_img, start_date, end_date, content, form_data)

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

//챌린지 전체 리스트 불러오기
function listing() {
    $.ajax({
        type: "GET",
        url: "/listing",
        data: {},
        success: function (response) {
            let rows = response['challenge_list']
            console.log(rows)
            for (let i = 0; i < rows.length; i++) {
                let challenge_img = rows[i]['challenge_img']
                let title = rows[i]['title']
                //let participants = 10 //certification에서 데이터 가져와야함
                let start_date = rows[i]['start_date']
                let end_date = rows[i]['end_date']
                let content = rows[i]['content']
                console.log(challenge_img, title, start_date, end_date, content)

                let temp_html = `<div class="col">
                            <div class="card h-100">
                                <img src="{{ url_for('static', filename='challenge_img/${challenge_img}') }}"> <!--flask img 불러오기-->
                                <div class="card-body">
                                    <h5 class="card-title">${title}<small class="participants">10명 참여중</small></h5>
                                    <h6 class="card-text period">기간 <span>${start_date}~${end_date}</span></h6>
                                    <p class="card-text">${content}</p>
                                </div>
                            </div>
                        </div>`
                $('#challenge-list').append(temp_html)
            }
        }
    })
}
