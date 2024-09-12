const displayPokemon = () => {
    fetch('http://localhost:3000/pokemon')
      .then(response => response.json())
      .then(pokeArray => {
        pokeArray.forEach(pokemon => {
          const pokeContainer = document.createElement('div');
          pokeContainer.className = 'pokemon-container';
  
          const pokeImageElement = document.createElement('img');
          pokeImageElement.src = pokemon.image;
          pokeImageElement.alt = pokemon.name;
  
          const pokeName = document.createElement('div');
          pokeName.className = 'pokemon-name';
          pokeName.textContent = pokemon.name;
  
          pokeContainer.appendChild(pokeImageElement);
          pokeContainer.appendChild(pokeName);
          
          const deleteButton = document.createElement('button');
          deleteButton.className = 'delete'
          deleteButton.textContent = "X";
          pokeContainer.appendChild(deleteButton);

          deleteButton.addEventListener('click', () => {
            pokeContainer.remove();

            fetch(`http://localhost:3000/pokemon/${pokemon.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
            })
          })

          pokeContainer.addEventListener('mouseover', () => {
            pokeImageElement.classList.add('low-opacity');
            pokeName.style.display = 'block';
            deleteButton.style.display = 'block';
          });
  
          pokeContainer.addEventListener('mouseout', () => {
            pokeImageElement.classList.remove('low-opacity');
            pokeName.style.display = 'none';
            deleteButton.style.display = 'none';
          });
  
          pokeContainer.addEventListener('click', () => {
            displayPokemonDetails(pokemon);
          });
  
          const picture = document.getElementById('pokemon-container');
          picture.appendChild(pokeContainer);
        });
      })
      .catch(error => console.error('Error fetching Pokemon data:', error));
  };
  
  const displayPokemonDetails = (pokemon) => {
    const detailsContainer = document.getElementById('pokemon-details');
    detailsContainer.innerHTML = `
      <h2>${pokemon.name}</h2>
      <p>Type: ${pokemon.type}</p>
      <p>Region: ${pokemon.region}</p>
      <p>Height: ${pokemon.height}</p>
      <p>Weight: ${pokemon.weight}</p>
      <p><span class="male-symbol">♂</span> ${pokemon.descriptionM}</p>
      <p><span class="female-symbol">♀</span> ${pokemon.descriptionF}</p>
    `;
    detailsContainer.style.display = 'block';
  };

  function setupDetailsBoxClosing() {
    const detailsBox = document.getElementById('pokemon-details');
    
    document.addEventListener('click', (event) => {
      const isClickInsideDetails = detailsBox.contains(event.target);
      const isClickOnPokemon = event.target.closest('.pokemon-container');
      
      if (!isClickInsideDetails && !isClickOnPokemon && detailsBox.style.display === 'block') {
        detailsBox.style.display = 'none';
      }
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    displayPokemon();
    setupDetailsBoxClosing();
  });
  
const newPokemonForm = document.getElementById('new-pokemon-form')
newPokemonForm.addEventListener('submit', (event) => {
    event.preventDefault(); 

    const newPokeName = document.getElementById('pokemon-name')
    const newPokeType = document.getElementById('pokemon-type')
    const newPokeRegion = document.getElementById('pokemon-region')
    const newPokeHeight = document.getElementById('pokemon-height')
    const newPokeWeight = document.getElementById('pokemon-weight')
    const newPokeImage = document.getElementById('pokemon-image')
    const newPokeDescriptionM = document.getElementById('pokemon-descriptionM')
    const newPokeDescriptionF = document.getElementById('pokemon-descriptionF')


    const newPokemon = {
        name: newPokeName.value,
        type: newPokeType.value,
        region: newPokeRegion.value,
        height: newPokeHeight.value,
        weight: newPokeWeight.value,
        descriptionM: newPokeDescriptionM.value,
        descriptionF: newPokeDescriptionF.value,
        image: newPokeImage.value
    }
    
    const imgElement = document.createElement('img')
    imgElement.src = newPokemon.image
    const pokeElement = document.querySelector('#pokemon-container')
    imgElement.addEventListener('click', () => handleClick(newItem));
    pokeElement.appendChild(imgElement)

    fetch('http://localhost:3000/pokemon', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(newPokemon)
    })
    .then(response => {
        if(response.ok){
            response.json().then(newPokemonData => {
                addedPokemonToLibrary(newPokemonData)
            })
        }
        else{
            alert("Error: New Pokemon Not Added!")
        }
    })
     newPokemonForm.reset()

    })


