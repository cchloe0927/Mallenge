'use strict'
$(document).ready(function () {
    listing()
})

function disabledCard() {
    alert('마감된 챌린지 입니다.')
}

//내가 만든 챌린지 불러오기
function listing() {
    $.ajax({
        type: "GET",
        url: "/listing",
        data: {},
        success: function (response) {
            console.log(response)
            let challenge_rows = response['challenge_list']

            for (let i = 0; i < challenge_rows.length; i++) {
                let chall_id = challenge_rows[i]['chall_id']
                let challenge_img = challenge_rows[i]['challenge_img']
                let title = challenge_rows[i]['title']
                //let participants = 10 //certification에서 데이터 가져와야함
                let start_date = challenge_rows[i]['start_date']
                let end_date = challenge_rows[i]['end_date']
                let content = challenge_rows[i]['content']
                // console.log(chall_id, challenge_img, title, start_date, end_date, content)

                let final_date = Number(end_date.split('-').join(''))
                //console.log(final_date)
                const date = new Date();
                const year = date.getFullYear();
                const month = ('0' + (date.getMonth() + 1)).slice(-2);
                const day = ('0' + date.getDate()).slice(-2);
                const today = Number(year+month+day);
                //console.log(today)

                let temp_html = ``
                if (today <= final_date) {
                    temp_html = `<div class="col card-box">
                            <div class="card h-100 cards" onclick="location.href='detail?challange=${chall_id}'">
                                <img src="../static/challenge_img/${challenge_img}" class="challenge_img">
                                <!--<img src="{{ url_for('static', filename='challenge_img/${challenge_img}') }}">--> <!--HTML에서 되는데 JS에서 작성 하면 안됨! 경로때문?-->
                                <div class="card-body">
                                    <h5 class="card-title">${title}<small class="participants">10명 참여</small></h5>
                                    <h6 class="card-text period">기간 <span>${start_date}~${end_date}</span></h6>
                                    <p class="card-text">${content}</p>
                                </div>
                            </div>
                        </div>`
                } else {
                    temp_html = `<div class="col card-box">
                            <div class="disabled">마감되었습니다.</div>
                            <div class="card h-100" style="opacity: 55%" onclick="disabledCard()">
                                <img src="../static/challenge_img/${challenge_img}" class="challenge_img">
                                <div class="card-body">
                                    <h5 class="card-title">${title}<small class="participants">10명 참여</small></h5>
                                    <h6 class="card-text period">기간 <span>${start_date}~${end_date}</span></h6>
                                    <p class="card-text">${content}</p>
                                </div>
                            </div>
                        </div>`
                }
                $('#challenge-list').append(temp_html)
            }
        }
    })
}
