let addToy = false
let collection = document.getElementById("toy-collection")
const addToyContainer = document.querySelector('.add-toy-form')

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
})

function getToyCollection() {
  return fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then((toysObj) => {
    toysObj.forEach(toy => renderToContainer(toy))
  })
}

function renderToContainer(toy) {
  let h2 = document.createElement('h2')
  h2.innerText = toy.name

  let img = document.createElement('img')
  img.setAttribute('src', toy.image)
  img.setAttribute('class', 'toy-avatar')

  let p = document.createElement('p')
  p.innerText = `${toy.likes} Likes`

  let button = document.createElement('button')
  console.log(button)
  button.innerText = 'like'
  button.setAttribute('class', 'like-btn')
  button.setAttribute('id', toy.id)
  button.addEventListener('click', (event) => {
    console.log(event)
    event.preventDefault()
    let likeIncrementer = parseInt(event.target.previousElementSibling.innerText) + 1
    fetch(`http://localhost:3000/toys/${event.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "likes": likeIncrementer
      })
    })
    .then(res => res.json())
    .then((like_obj => {
      event.target.previousElementSibling.innerText = `${likeIncrementer} likes`;
    }))
  })

  let card = document.createElement('div')
  card.setAttribute('class', 'card')
  card.append(h2, img, p, button)
  collection.append(card)
}


addToyContainer.addEventListener("submit", (event) => {
  event.preventDefault()
      let toyName = event.target.name.value
      let toyImage = event.target.image.value
    
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "name": toyName,
        "image": toyImage,
        "likes": 0
      })
    })
      .then(response => response.json())
      .then(data => {
      console.log('Success:', data);
      renderToContainer(data)
    })
      .catch((error) => {
      console.error('Error:', error);
  })
})


getToyCollection()