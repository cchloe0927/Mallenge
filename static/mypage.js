'use strict'
$(document).ready(function () {
    listing()
    joinchall()
})

function disabledCard() {
    alert('마감된 챌린지 입니다.')
}

//내가 만든 챌린지 불러오기
function listing() {
    $.ajax({
        type: "GET",
        url: "/mypage/madechall",
        data: {},
        success: function (response) {
            //console.log(response)
            let challenge_rows = response['challenge_list'] //챌린지에서 데이터 가져옴
            let my_challenge_rows = response['my_challenge_list'] //my_challenge에서 데이터 가져옴
            let loginuser_id = response['user_id'] //로그인한 유저 id값 가져옴

            //필터함수로 아이디(만든사람)가 똑같은 값의 챌린지만 뽑아냄
            challenge_rows = JSON.stringify(challenge_rows);
            const new_challenge_rows = JSON.parse(challenge_rows).filter(function (element) {
                return element.user_id == loginuser_id;
            });
            //console.log(my_challenge_rows);

            //아이디가 똑같은 값의 챌린지를 FOR로 돌림
            for (let i = 0; i < new_challenge_rows.length; i++) {
                let chall_id = new_challenge_rows[i]['chall_id']
                let challenge_img = new_challenge_rows[i]['challenge_img']
                let title = new_challenge_rows[i]['title']
                //let participants = 10 //certification에서 데이터 가져와야함
                let start_date = new_challenge_rows[i]['start_date']
                let end_date = new_challenge_rows[i]['end_date']

                //전체 일수 구하기
                const getDateDiff = (d1, d2) => {
                  const date1 = new Date(d1);
                  const date2 = new Date(d2);

                  const diffDate = date1.getTime() - date2.getTime();
                  return Math.abs(diffDate / (1000 * 60 * 60 * 24)); // 밀리세컨 * 초 * 분 * 시 = 일
                }
                let dateNumber = getDateDiff(start_date, end_date) + 1
                console.log(dateNumber)

            //my_challenged에서 chall_id데이터 추출 > 참가자수 구하기
            let participants = 0;
            for (let j=0 ; j<my_challenge_rows.length; j++) {
                let data = my_challenge_rows[j]
                let chall_id = my_challenge_rows[j]
                console.log(data)
                //console.log("data:", data["chall_id"]) //키값을 가져올 때는 ""로
                if (data["chall_id"] == chall_id) {
                    participants++
                }
            }
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
                                    <h5 class="card-title">${title}<small class="participants">${participants}명 참여</small></h5>
                                    <h6 class="card-text period">기간 <span>${start_date}~${end_date}</span></h6>
                                    <progress value="20" max="100"></progress>
                                    <p class="card-text">20% 달성</p>
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
                                    <progress value="20" max="100"></progress>
                                    <p class="card-text">20% 달성</p>
                                </div>
                            </div>
                        </div>`
                }
                $('#challenge-list1').append(temp_html)
            }
        }
    })
}


//내가 참여한 불러오기
function joinchall() {
    $.ajax({
        type: "GET",
        url: "/mypage/madechall",
        data: {},
        success: function (response) {
            //console.log(response)
            let challenge_rows = response['challenge_list']
            let certification_list = response['certification_list']
            let my_challenge_rows = response['my_challenge_list'] //my_challenge에서 데이터 가져옴
            let loginuser_id = response['user_id']

            challenge_rows = JSON.stringify(challenge_rows);

            //필터함수로 아이디(만든사람)가 똑같은 값의 챌린지만 뽑아냄
            const new_challenge_rows = JSON.parse(challenge_rows).filter(function (element) {
                return element.user_id == loginuser_id;
            });

            //console.log(my_challenge_rows);

            //my_challenged에서 chall_id데이터 추출
            let participants = 0;
            for (let j=0 ; j<my_challenge_rows.length; j++) {
                let data = my_challenge_rows[j]
                let chall_id = my_challenge_rows[j]
                console.log(data)
                //console.log("data:", data["chall_id"]) //키값을 가져올 때는 ""로
                if (data["chall_id"] == chall_id) {
                    participants++
                }
            }

            //챌린지값 뽑아냄
            for (let i = 0; i < new_challenge_rows.length; i++) {
                let chall_id = new_challenge_rows[i]['chall_id']
                let challenge_img = new_challenge_rows[i]['challenge_img']
                let title = new_challenge_rows[i]['title']
                //let participants = 10 //certification에서 데이터 가져와야함
                let start_date = new_challenge_rows[i]['start_date']
                let end_date = new_challenge_rows[i]['end_date']

                //전체 일수 구하기
                const getDateDiff = (d1, d2) => {
                  const date1 = new Date(d1);
                  const date2 = new Date(d2);

                  const diffDate = date1.getTime() - date2.getTime();
                  return Math.abs(diffDate / (1000 * 60 * 60 * 24)); // 밀리세컨 * 초 * 분 * 시 = 일
                }
                let dateNumber = getDateDiff(start_date, end_date) + 1
                console.log(dateNumber)

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
                                    <h5 class="card-title">${title}<small class="participants">${participants}명 참여</small></h5>
                                    <h6 class="card-text period">기간 <span>${start_date}~${end_date}</span></h6>
                                    <progress value="20" max="100"></progress>
                                    <p class="card-text">20% 달성</p>
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
                                    <progress value="20" max="100"></progress>
                                    <p class="card-text">20% 달성</p>
                                </div>
                            </div>
                        </div>`
                }
                $('#challenge-list2').append(temp_html)
            }
        }
    })
}