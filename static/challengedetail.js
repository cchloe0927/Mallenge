// 참가 여부에 따라 hide, show 설정 해야해
// $(document).ready(function(){
//             $('#cer_box').hide()
//         })

$(document).ready(function(){
          display();
          show_certi();
        });

// $(document).ready(function(){
//           show_certi();
//         });

//참가하기 눌렀을 때
function open_box(){

        $.ajax({
            type: 'POST',
            url: '/my_challenge',
            data: {'chall_id_give': 10, 'user_id_give':100},
            success: function (response) {
                alert(response['msg'])
                window.location.reload()
            }
        });
        $('#cer_box').show()
    }



//
// function close_box(){
//     $('#cer_box').hide()
// }

function display() {

    $.ajax({
        type: 'GET',
        url: '/challenge',
        data: {},
        success: function (response) {

            // console.log(response['one_challenge'])

            let one_title = response['one_challenge']['title']
            let one_image = response['one_challenge']['challenge_img']
            let one_s_date = response['one_challenge']['start_date']
            let one_e_date = response['one_challenge']['end_date']
            let one_contents = response['one_challenge']['content']
            let one_participants = response['one_challenge']['participants']

            // console.log(one_image, one_contents, one_title, one_e_date, one_s_date)


            let temp_html = `
                                    
                                        <div class="para">
                                            <img src="${one_image}">
                                            <div class="vertical">
                                                <p>${one_title}</p>
                                                <p>기간 : ${one_s_date} ~ ${one_e_date}</p>
                                                <p>참가 인원 : ${one_participants} 명</p>
                                                <button onclick="open_box()" type="button" class="btn btn-danger">참가하기</button>
                                            </div>
                                        </div>
                                        <div class="description">
                                            <p>챌린지 설명</p>
                                            <p>${one_contents}</p>
                                        </div>
                                  
                    `
            $('#detail-box').append(temp_html)
        }
    })
}

function show_certi() {
        $.ajax({
            type: "GET",
            url: "/certification",
            data: {},
            success: function (response) {

                console.log(response)

                let rows = response['certilist']

                 console.log(rows)
                for (let i = 0; i < rows.length; i++) {

                    let comment = rows[i]['comment']
                    let cer_id = rows[i]['cer_id']
                    let user_id = rows[i]['user_id']

                    let temp_html = `<tr>
                                        <th scope="row">${cer_id}</th>
                                        <td>${user_id}</td>
                                        <td>${comment}</td>
                                    </tr>
                                    `
                    $('#certitable').append(temp_html)
                }
            }
        });
    }



function save_certi() {
        // let cer_id = 12
        let comment = $('#comment').val()
        let user_id = 100
        let chall_id = 10
        let date = "22-11-15"

        $.ajax({
            type: 'POST',
            url: '/certification',
            data: {
                    // 'cer_id_give' : cer_id,
                    'comment_give': comment,
                    'user_id_give' : user_id,
                    'chall_id_give' : chall_id,
                    'date_give' : date},
            success: function (response) {
                alert(response['msg'])
                window.location.reload()
            }
        });
    }

