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
            let certification_rows = response['certification_list'] //인증 데이터 가져옴
            let my_challenge_rows = response['my_challenge_list'] //my_challenge에서 데이터 가져옴
            let loginuser_id = response['user_id'] //로그인한 유저 id값 가져옴


            //필터함수로 아이디(만든사람)가 똑같은 값의 챌린지만 뽑아냄
            challenge_rows = JSON.stringify(challenge_rows);
            const new_challenge_rows = JSON.parse(challenge_rows).filter(function (element) {
                return element.user_id == loginuser_id;
            });
            //console.log(new_challenge_rows);

            //위에서 뽑아낸 데이터에서 챌린지값만 배열에서 넣음
            let allchallidArray = []
            for (let k = 0; k < new_challenge_rows.length; k++) {
                //console.log(new_my_challenge_rows[k]['chall_id'])
                let allchallid = new_challenge_rows[k]['chall_id']
                allchallidArray.push(allchallid)
            }
            //console.log(allchallidArray)

            //챌린지 db에서 마이챌린지 챌린지값이랑 챌린지값이 같은 데이터를 배열로 만듦
            let challengeArray = []
            for ( let i = 0; i < allchallidArray.length; i++) {
                for ( let j = 0; j < new_challenge_rows.length; j++) {
                    if (allchallidArray[i] == new_challenge_rows[j]['chall_id']) {
                   challengeArray.push(new_challenge_rows[j])
                    }
                }
            }
            //console.log("challengeArray :", challengeArray)

            //확인 db에서 마이챌린지 챌린지값이랑 챌린지값이 같은 데이터를 배열로 만듦
            let certiArray = []
            for ( let i = 0; i < allchallidArray.length; i++) {
                for ( let j = 0; j < certification_rows.length; j++) {
                    if (allchallidArray[i] == certification_rows[j]['chall_id']) {
                   certiArray.push(certification_rows[j])
                    }
                }
            }
            //console.log("certiArray :",certiArray)

            //필터함수로 user_id가 똑같은 값의 챌린지만 뽑아냄
            certiArray = JSON.stringify(certiArray);
            const new_certiArray = JSON.parse(certiArray).filter(function (element) {
                return element.user_id == loginuser_id;
            });
            //console.log("new_certiArray: ", new_certiArray)

            //챌린지 id와 count를 객체로 만듦
            /*let obj = {}
            for ( let i = 0; i < new_certiArray.length; i++) {
                let keyname = new_certiArray[i]["chall_id"]
                if (obj.hasOwnProperty(keyname)) { //객체 안에 키값이 있냐
                    obj[keyname] = obj[keyname] + 1
                } else {
                    obj[keyname] = 1
                }
            }*/
            //console.log("내가 참여하는 obj : ", obj)



            //아이디가 똑같은 값의 챌린지를 FOR로 돌림
            for (let i = 0; i < new_challenge_rows.length; i++) {
                let chall_id = new_challenge_rows[i]['chall_id']
                let challenge_img = new_challenge_rows[i]['challenge_img']
                let title = new_challenge_rows[i]['title']
                //let participants = 10 //certification에서 데이터 가져와야함
                let start_date = new_challenge_rows[i]['start_date']
                let end_date = new_challenge_rows[i]['end_date']
                let content = new_challenge_rows[i]['content']

                //전체 일수 구하기
                /*const getDateDiff = (d1, d2) => {
                  const date1 = new Date(d1);
                  const date2 = new Date(d2);

                  const diffDate = date1.getTime() - date2.getTime();
                  return Math.abs(diffDate / (1000 * 60 * 60 * 24)); // 밀리세컨 * 초 * 분 * 시 = 일
                }
                let dateNumber = getDateDiff(start_date, end_date) + 1

                if (obj[chall_id] === undefined) {
                    obj[chall_id] === 0
                    return
                }
                //퍼센테이지 구하기
                let datepercent = Math.floor(obj[chall_id] / dateNumber * 100)*/

            //my_challenged에서 chall_id데이터 추출
                let participants = 0;
                for (let j=0 ; j<my_challenge_rows.length; j++) {
                    let data = my_challenge_rows[j]
                    //console.log("data:", data["chall_id"]) //키값을 가져올 때는 ""로
                    if (data["chall_id"] == chall_id) {
                        participants++
                    }
                }
                //console.log("chall_id :", chall_id, "participants :", participants)

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
                            <div class="card h-100 cards" onclick="location.href='/challengedetail?challenge=${chall_id}'">
                                <img src="../static/challenge_img/${challenge_img}" class="challenge_img">
                                <!--<img src="{{ url_for('static', filename='challenge_img/${challenge_img}') }}">--> <!--HTML에서 되는데 JS에서 작성 하면 안됨! 경로때문?-->
                                <div class="card-body">
                                    <h5 class="card-title">${title}<small class="participants">${participants}명 참여</small></h5>
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
                $('#challenge-list1').append(temp_html)
            }
        }
    })
}


//내가 참여하는 챌린지 불러오기
function joinchall() {
    $.ajax({
        type: "GET",
        url: "/mypage/madechall",
        data: {},
        success: function (response) {
            //console.log(response)
            let challenge_rows = response['challenge_list']
            let certification_rows = response['certification_list']
            let my_challenge_rows = response['my_challenge_list'] //my_challenge에서 데이터 가져옴
            let loginuser_id = response['user_id']

            my_challenge_rows = JSON.stringify(my_challenge_rows);

            //console.log (my_challenge_rows)

            //필터함수로 user_id가 똑같은 값의 챌린지만 뽑아냄
            const new_my_challenge_rows = JSON.parse(my_challenge_rows).filter(function (element) {
                return element.user_id == loginuser_id;
            });
            //console.log(new_my_challenge_rows)

            //마이챌린지에서 챌린지값만 배열에서 넣음
            let allchallidArray = []
            for (let k = 0; k < new_my_challenge_rows.length; k++) {
                //console.log(new_my_challenge_rows[k]['chall_id'])
                let allchallid = new_my_challenge_rows[k]['chall_id']
                allchallidArray.push(allchallid)
            }
            //console.log(allchallidArray)

            //챌린지 db에서 마이챌린지 챌린지값이랑 챌린지값이 같은 데이터를 배열로 만듦
            let challengeArray = []
            for ( let i = 0; i < allchallidArray.length; i++) {
                for ( let j = 0; j < challenge_rows.length; j++) {
                    if (allchallidArray[i] == challenge_rows[j]['chall_id']) {
                   challengeArray.push(challenge_rows[j])
                    }
                }
            }
            //console.log(challengeArray)
            //확인 db에서 마이챌린지 챌린지값이랑 챌린지값이 같은 데이터를 배열로 만듦
            let certiArray = []
            for ( let i = 0; i < allchallidArray.length; i++) {
                for ( let j = 0; j < certification_rows.length; j++) {
                    if (allchallidArray[i] == certification_rows[j]['chall_id']) {
                   certiArray.push(certification_rows[j])
                    }
                }
            }
            //console.log(certiArray)

            //필터함수로 user_id가 똑같은 값의 챌린지만 뽑아냄
            certiArray = JSON.stringify(certiArray);
            const new_certiArray = JSON.parse(certiArray).filter(function (element) {
                return element.user_id == loginuser_id;
            });
            //console.log(new_certiArray)

            //챌린지 id와 count를 객체로 만듦
            let obj = {}
            for ( let i = 0; i < new_certiArray.length; i++) {
                let keyname = new_certiArray[i]["chall_id"]
                if (obj.hasOwnProperty(keyname)) { //객체 안에 키값이 있냐
                    obj[keyname] = obj[keyname] + 1
                } else {
                    obj[keyname] = 1
                }
            }
            //console.log("obj : ", obj)
            // const new_challenge_rows = JSON.parse(challenge_rows).filter(function (element) {
            //     return element.chall_id == new_my_challenge_rows['chall_id'];
            // });
            // console.log(new_challenge_rows)



            //console.log("challengeArray :", challengeArray)
            //챌린지값 뽑아냄
            for (let i = 0; i < challengeArray.length; i++) {
                let chall_id = challengeArray[i]['chall_id']
                let challenge_img = challengeArray[i]['challenge_img']
                let title = challengeArray[i]['title']
                //let participants = 10 //certification에서 데이터 가져와야함
                let start_date = challengeArray[i]['start_date']
                let end_date = challengeArray[i]['end_date']

                //마이챌린지 데이터에서 필터함수로 챌린지값이 같은 것만 뽑아냄
                const pa_my_challenge_rows = JSON.parse(my_challenge_rows).filter(function (element) {
                    return element.chall_id == chall_id;
                });
                //console.log(pa_my_challenge_rows)

                //참가자수 위의 데이터 토대로 구하기
                let participants = 0;
                for (let j=0 ; j<pa_my_challenge_rows.length; j++) {
                    let data = pa_my_challenge_rows[j]
                    //console.log("data:", data["chall_id"]) //키값을 가져올 때는 ""로
                    if (data["chall_id"] == chall_id) {
                        participants++
                    }
                }
                //console.log("chall_id :", chall_id, "participants :", participants)



                //전체 일수 구하기
                const getDateDiff = (d1, d2) => {
                  const date1 = new Date(d1);
                  const date2 = new Date(d2);

                  const diffDate = date1.getTime() - date2.getTime();
                  return Math.abs(diffDate / (1000 * 60 * 60 * 24)); // 밀리세컨 * 초 * 분 * 시 = 일
                }
                let dateNumber = getDateDiff(start_date, end_date) + 1

                if (obj[chall_id] === undefined) {
                    obj[chall_id] === 0
                    return
                }

                let datepercent = Math.floor(obj[chall_id] / dateNumber * 100)
                //console.log("챌린지아이디 :", chall_id)
                //console.log("특정 챌린지 전체 기간 :", dateNumber)
                //console.log("특정 챌린지의 달성 일수 :", obj[chall_id])
                //console.log("% : ", datepercent )
                //console.log("-----------------------")
                //전체 일수 구하기 끝

                let final_date = Number(end_date.split('-').join(''))
                //console.log(final_date)
                const date = new Date();
                const year = date.getFullYear();
                const month = ('0' + (date.getMonth() + 1)).slice(-2);
                const day = ('0' + date.getDate()).slice(-2);
                const today = Number(year+month+day);
                //console.log(today)

                //my_challenged에서 chall_id데이터 추출
                // let participants = 0;
                // for (let j=0 ; j<my_challenge_rows.length; j++) {
                //     let data = my_challenge_rows[j]
                //     //console.log("data:", data["chall_id"]) //키값을 가져올 때는 ""로
                //     if (data["chall_id"] == chall_id) {
                //         participants++
                //     }
                // }
                // console.log("chall_id :", chall_id, "participants :", participants)

                let temp_html = ``
                if (today <= final_date) {
                    temp_html = `<div class="col card-box">
                            <div class="card h-100 cards" onclick="location.href='/challengedetail?challenge=${chall_id}'">
                                <img src="../static/challenge_img/${challenge_img}" class="challenge_img">
                                <!--<img src="{{ url_for('static', filename='challenge_img/${challenge_img}') }}">--> <!--HTML에서 되는데 JS에서 작성 하면 안됨! 경로때문?-->
                                <div class="card-body">
                                    <h5 class="card-title">${title}<small class="participants">${participants}명 참여</small></h5>
                                    <h6 class="card-text period">기간 <span>${start_date}~${end_date}</span></h6>
                                    <progress value="${obj[chall_id]}" max="${dateNumber}"></progress>
                                    <p class="card-text">${datepercent}% 달성</p>
                                </div>
                            </div>
                        </div>`
                } else {
                    temp_html = `<div class="col card-box">
                            <div class="disabled">마감되었습니다.</div>
                            <div class="card h-100" style="opacity: 55%" onclick="disabledCard()">
                                <img src="../static/challenge_img/${challenge_img}" class="challenge_img">
                                <div class="card-body">
                                    <h5 class="card-title">${title}<small class="participants">${participants}명 참여</small></h5>
                                    <h6 class="card-text period">기간 <span>${start_date}~${end_date}</span></h6>
                                    <progress value="${obj[chall_id]}" max="${dateNumber}"></progress>
                                    <p class="card-text">${datepercent}% 달성</p>
                                </div>
                            </div>
                        </div>`
                }
                $('#challenge-list2').append(temp_html)
            }
        }
    })
}