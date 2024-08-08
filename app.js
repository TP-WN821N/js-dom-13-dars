let madal = document.getElementById('madal')
let add_user = document.getElementById('add_user')
let search = document.getElementById('search')
let close = document.getElementById('close')
let save = document.getElementById('save')
let form = document.getElementById('form')
let result = document.getElementById('result')
let remove = document.getElementById('remove')

let users = JSON.parse(localStorage.getItem("user")) || []
let obj = {}
let str = ''
let user_index

search.addEventListener('input', (e) => {
  str = e.target.value.toLowerCase()
  displayUser()
})

document.addEventListener('DOMContentLoaded', () => {
  add_user.addEventListener('click', () => {
    user_index = -2
    madalToggle('flex')
    form.reset()
  })

  close.addEventListener('click', () => {
    madalToggle("none")
  })

  save.addEventListener('click', () => {
    saveClicked()
  })
  remove.addEventListener('click', () => {
    form.reset()
  })
  displayUser()
})

function saveClicked() {
  let search_users = users.filter(item => item.first_name.toLowerCase().includes(str));
  if (user_index >= 0) {
    search_users[user_index].first_name = form.first_name.value
    search_users[user_index].last_name = form.last_name.value
    search_users[user_index].age = form.age.value
    search_users[user_index].phone_number = form.phone_number.value
    search_users[user_index].email = form.email.value
  } else {
    users.push({ ...obj })
  }
  displayUser()
  getStorage()
}

function displayUser() {
  result.innerHTML = ""
  users.filter(item => {
    if (item.first_name.toLowerCase().includes(str)) {
      return item
    }
  }).forEach((item, i) => {
    let tr = document.createElement('tr')
    tr.innerHTML = `
        <td class="border text-center">${i + 1}</td>
        <td class="border text-center">${item.first_name}</td>
        <td class="border text-center">${item.last_name}</td>
        <td class="border text-center">${item.age}</td>
        <td class="border text-center">${item.phone_number}</td>
        <td class="border text-center">${item.email}</td>
        <td class="flex justify-center gap-3 border">
          <button onclick="editeUser(${i})" class="bg-orange-400 text-white px-4 py-1 rounded my-1">Edit</button>
          <button onclick="deleteUser(${i})" id="delUser_${i}" class="bg-red-600 text-white px-4 py-1 rounded my-1">Delete</button>
        </td>
      `
    result.appendChild(tr)
  })
  madalToggle('none')
}

window.addEventListener('click', (e) => {
  if (e.target === madal) {
    madalToggle('none')
  }
})

function madalToggle(status) {
  madal.style.display = status
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
})

function handelChange(event) {
  let { name, value } = event.target
  obj[name] = value
  obj = { ...obj, [name]: value, id: users[users.length - 1] ? users[users.length - 1].id + 1 : 0 }
}

function getStorage() {
  localStorage.setItem("user", JSON.stringify(users))
}

function deleteUser(i) {
  let search_users = users.filter(item => item.first_name.toLowerCase().includes(str));
  users = users.filter(item => item.id !== search_users[i].id);
  displayUser();
  getStorage();
}


function editeUser(i) {
  madalToggle("flex")
  let search_users = users.filter(item => item.first_name.toLowerCase().includes(str));
  users.forEach(item => {
    if (item.id === search_users[i].id) {
      form.first_name.value = search_users[i].first_name
      form.last_name.value = search_users[i].last_name
      form.age.value = search_users[i].age
      form.phone_number.value = search_users[i].phone_number
      form.email.value = search_users[i].email
    }
  })
  user_index = i
}

