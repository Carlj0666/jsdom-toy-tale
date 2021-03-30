let addToy = false
let collection = document.getElementById("toy-collection")
const createButton = document.getElementsByClassName('submit')
const addToyContainer = document.getElementsByClassName('add-toy-form')

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
  button.innerText = 'like'
  button.setAttribute('class', 'like-btn')
  button.addEventListener('click', (event) => {
   // invoke a function to handle likes

  })
  let card = document.createElement('div')
  card.setAttribute('class', 'card')
  card.append(h2, img, p, button)
  collection.append(card)
}

createButton.addEventListener("click", () => { createNewToy('addToyContainer')

//Add new toy function
  function createNewToy(addToyContainer) {
    let toy_name = addToyContainer[0][0].name
    let toy_image = addToyContainer[0][1].image
    debugger
    
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "name": toy_name,
        "image": toy_image,
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
}


getToyCollection()