// Variables
// var counter = 2;
var limit = 6;

var Attendie1 = document.getElementById('Att1');
var Attendie2 = document.getElementById('Att2');
var Attendie3 = document.getElementById('Att3');
var Attendie4 = document.getElementById('Att4');
var Attendie5 = document.getElementById('Att5');
var Attendie6 = document.getElementById('Att6');
var textBox1 = document.getElementById('rsvpTextArea');
var unableAttendie1 = document.getElementById('unableAtt1');
var unableAttendie2 = document.getElementById('unableAtt2');
var unableTextBox1 = document.getElementById('unableTextArea');
var checkRSVP = document.getElementById("RSVP");

const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");
const page3 = document.getElementById("page3")
const invCode = document.getElementById("invitecode");
const invCode2 = document.getElementById("Page2InviteCode");

function inputReset() {
    invCode.style.display = 'inline';
    invCode.style.border = '1px solid #4b2f45';
    invCode.placeholder = 'Enter Code Here';
}

document.getElementById("RSVP").onclick = function (e) {
    e.preventDefault();
    const data = { "wedding_code": invCode.value };
    // console.log(data);
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch('/api', options).then(response => {
        if (response.ok) {
            return response.json()
        }
        return Promise.reject(response);
    }).then(function (data, response) {
        const {name1,name2,name3,name4,name5,name6,wedding_code} = data
        // console.log(data)
        if (invCode.value !== "") {
            if (data.status === 'success') {
                Attendie1.value = name1;
                Attendie2.value = name2;
                Attendie3.value = name3;
                Attendie4.value = name4;
                Attendie5.value = name5;
                Attendie6.value = name6;
                invCode2.value = wedding_code.toUpperCase();
                page1.style.display = "none";
                page2.style.display = "block";
                if (data.name3 !== null) {
                    document.getElementById('brAtt3').style.display = "block";
                    document.getElementById('LabelAtt3').style.display = "block";
                    Attendie3.style.display = "inline";
                    if (data.name4 !== null) {
                        document.getElementById('brAtt4').style.display = "block";
                        document.getElementById('LabelAtt4').style.display = "block";
                        Attendie4.style.display = "inline";
                        if (data.name5 !== null) {
                            document.getElementById('brAtt5').style.display = "block";
                            document.getElementById('LabelAtt5').style.display = "block";
                            Attendie5.style.display = "inline";
                            if (data.name6 !== null) {
                                document.getElementById('brAtt6').style.display = "block";
                                document.getElementById('LabelAtt6').style.display = "block";
                                Attendie6.style.display = "inline";
                                document.getElementById("addPeopleButton").style.display = "none";
                            }
                        }
                    }
                    return false;
                }
            } else {
                // console.log('Invite code failed')
                invCode.style.border = '2px solid #ff073a';
                invCode.value = '';
                invCode.placeholder = 'Incorrect Code';
            }
        }
    }).catch(function (error) {
        console.warn(`Something wnent wrong.`, error)
    });
}
document.getElementById("unableToMakeIt").onclick = function (e) {
    e.preventDefault();
    const data = { "wedding_code": invCode.value.toUpperCase() };
    // console.log(data);
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch('/api2', options).then(response => {
        if (response.ok) {
            return response.json()
        }
        return Promise.reject(response);
    }).then(function (data) {
        const {status,name1,name2,name3,name4,name5,name6,wedding_code} = data
        if (invCode.value !== "") {
            if (status === 'success') {
                unableAttendie1.value = name1;
                unableAttendie2.value = name2;
                document.getElementById("Page3InviteCode").value = wedding_code.toUpperCase();
                page1.style.display = "none";
                page3.style.display = "block";
            } else {
                // console.log('Invite code failed')
                invCode.style.border = '2px solid #ff073a';
                invCode.value = '';
                invCode.placeholder = 'Incorrect Code';
            }
        }

    }).catch(function (error) {
        console.warn(`Something wnent wrong.`, error)
    });
};
document.getElementById("addPeopleButton").onclick = function (e) {
    e.preventDefault();
    if (Attendie3.style.display == "none") {
        document.getElementById('brAtt3').style.display = "block";
        document.getElementById('LabelAtt3').style.display = "block";
        Attendie3.style.display = "inline";
        return false;
    }
    else if (document.getElementById('Att4').style.display == "none") {
        document.getElementById('brAtt4').style.display = "block";
        document.getElementById('LabelAtt4').style.display = "block";
        Attendie4.style.display = "inline";
        return false;
    }
    else if (document.getElementById('Att5').style.display == "none") {
        document.getElementById('brAtt5').style.display = "block";
        document.getElementById('LabelAtt5').style.display = "block";
        Attendie5.style.display = "inline";
        return false;
    } else if (document.getElementById('Att6').style.display == "none") {
        document.getElementById('brAtt6').style.display = "block";
        document.getElementById('LabelAtt6').style.display = "block";
        Attendie6.style.display = "inline";
        document.getElementById("addPeopleButton").style.display = "none";
        return false;
    } else {
        alert("You have reached the limit of " + limit + " attendees.");
        return true;
    }

};

document.getElementById("submitRSVP").onclick = function (e) {
    e.preventDefault();
    const data = {
        "wedding_code": invCode.value,
        "name1": Attendie1.value,
        "name2": Attendie2.value,
        "name3": Attendie3.value,
        "name4": Attendie4.value,
        "name5": Attendie5.value,
        "name6": Attendie6.value,
        "additional_comments": textBox1.value
    };
    console.log(data);
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch('/apiSubmit1', options).then(response => {
        if (response.ok) {
            return response.json()
        }
        return Promise.reject(response);
    }).then(function (data) {
        if (data.status === "success") {
            console.log(data);
            window.location.replace("thankyou.html");

        }

    }).catch(function (error) {
        console.warn(`Something wnent wrong.`, error)
    });
}

document.getElementById("submitUnable").onclick = function (e) {
    e.preventDefault();
    const data = {
        "wedding_code": invCode.value,
        "name1": unableAttendie1.value,
        "name2": unableAttendie2.value,
        "additional_comments": unableTextBox1.value
    };
    console.log(data);
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch('/apiSubmit2', options).then(response => {
        if (response.ok) {
            return response.json()
        }
        return Promise.reject(response);
    }).then(function (data) {
        if (data.status === "success") {
            window.location.replace("thankyou.html");
        }

    }).catch(function (error) {
        console.warn(`Something wnent wrong.`, error)
    });
}