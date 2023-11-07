window.onload = () => {
    const username = localStorage.getItem("username");
    if (!username) {
        self.location = 'index.html';
    }
    const usernameInput = document.getElementById("username");
    usernameInput.value = username;
    document.querySelector('body').classList.remove("d-none");
}
var memberTable = document.querySelector('#memberList');
var memberList = [
    {
        "username": "admin",
        "name": "admin",
        "gender": "Male",
        "birthday": "01/01/2000",
        "address": "Malaysia"
    },
    {
        "username": "john_doe",
        "name": "John Doe",
        "gender": "Male",
        "birthday": "15/01/1999",
        "address": "Kuala Lumpur, Malaysia"
    },
    {
        "username": "jane_smith",
        "name": "Jane Smith",
        "gender": "Female",
        "birthday": "14/11/2001",
        "address": "Selangor, Malaysia"
    }
]
memberList.forEach((member) => {
    var rowHtml = `
        <tr>
            <th scope="row"></th>
            <td>${member.username}</td>
            <td>${member.name}</td>
            <td>${member.gender}</td>
            <td>${member.birthday}</td>
            <td>${member.address}</td>
        </tr>
    `;
    memberTable.insertAdjacentHTML("beforeend", rowHtml);
});

function exportPdf() {
    let members = []
    memberList.forEach((element) => {
        members.push([element.username, element.name, element.gender, element.birthday, element.address]);
    })

    const doc = new jsPDF()
    doc.autoTable({
        head: [['Username', 'Name', 'Gender', 'Birthday', 'Address']],
        body: members
    })
    doc.save("Member_details.pdf");
}

var form = document.querySelector("form");
form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const username = form.username.value.trim();
    const name = form.name.value.trim();
    const gender = form.gender.value;
    const birthday = formatDateString(form.birthday.value);
    const address = form.address.value.trim();

    const tempMember = {username, name, gender, birthday, address};

    if(username != ""
    && name     != ""
    && gender   != null 
    && birthday != null
    && address  != ""    ){
        createNewMember(tempMember);
    }
})

function createNewMember(member){
    var rowHtml = `
        <tr>
            <th scope="row"></th>
            <td>${member.username}</td>
            <td>${member.name}</td>
            <td>${member.gender}</td>
            <td>${member.birthday}</td>
            <td>${member.address}</td>
        </tr>
    `;
    memberList.push(member);
    memberTable.insertAdjacentHTML("beforeend", rowHtml);
}
function formatDateString(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}
function logout(){
    localStorage.removeItem(username);
    self.location = 'index.html';
}