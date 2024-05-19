

{

    let msgInput = document.getElementById('message-input');
    let sendButton = document.getElementById('send-button');

    function renderMessage(content, typer, container) {
        const receptormsg = `
        <div class="flex justify-start">
            <div class="bg-lightgray py-1.5 px-4 rounded-full">
            ${content}
            </div>
        </div>`

        const sendermsg = `  
        <div class="flex justify-end">
            <div class="bg-accent py-1.5 px-4 rounded-full">
                ${content}
            </div>
        </div>
        `

        container.insertAdjacentHTML("afterbegin", typer == 1 ? receptormsg : sendermsg);
    }

    if (urlParams.get('u')) {

        fetch('http://localhost:5000/api/user/get/' + urlParams.get('u')).then(async function (data) {
            data = await data.json();
            document.getElementById('friend-displayname').innerText = data.displayname;
            document.getElementById('user-profile-pic').attributes.src.value = 'http://localhost:5000/cdn/' + data.profilepic;
            document.getElementById('profile-button').attributes.href = "/profile/n=" + data.username
        })

        try {
            var ws = new WebSocket('ws://localhost:5001');
            let interval
            ws.onopen = function () {

                console.log('socket connection opened properly');

                ws.send(JSON.stringify({
                    actid: 0,
                    user_access_tkn: user_access_tkn,
                    receptor: urlParams.get('u')
                }))

                sendButton.addEventListener('click', function () {
                    ws.send(JSON.stringify({
                        actid: 2,
                        msg: msgInput.value
                    }))
                    renderMessage(msgInput.value, 0, document.getElementById('message-container'));
                    msgInput.value = ""
                })

                interval = setInterval(() => {
                    ws.send(JSON.stringify({
                        actid: 1,
                    }))
                    console.log("ticking...")
                }, 900);

            };

            ws.onmessage = function (evt) {
                renderMessage(JSON.parse(evt.data).msg, 1, document.getElementById('message-container'));
            };

            ws.onclose = function () {
                // websocket is closed.
                console.log("Connection closed...");
                clearInterval(interval)
            };

        } catch {
            console.log('wss conn failed')
        }
    }


}




