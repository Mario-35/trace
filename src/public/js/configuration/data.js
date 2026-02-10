["Batiment",
"Etage",
"Piece",
"Meuble",
"Etagere",
"Caisse"].forEach((e, i) => {
    	const li = document.createElement("li");
		li.setAttribute("draggable", 'true');
		li.setAttribute("data-index", i);
		li.textContent = e;
		getElement("list").appendChild(li);

    // <li data-index='0' draggable='true'>One</li>
})

const items = document.querySelectorAll('#list > li');

function makeDraggable(item) {
  item.addEventListener('dragstart', dragStart);
  item.addEventListener('drop', dropped);
  item.addEventListener('dragenter', cancelDefault);
  item.addEventListener('dragover', cancelDefault);
};

items.forEach((item) => {
    makeDraggable(item);
});

let selected = null;

function dragStart(e) {
  selected = e.target;
  const index = selected.dataset.index;
  e.dataTransfer.setData('text/plain', index);
}

function dropped(e) {
  cancelDefault(e);

  if (isBefore(selected, e.target)) {
    e.target.parentNode.insertBefore(selected, e.target);
  } else {
    e.target.parentNode.insertBefore(selected, e.target.nextSibling);
  }
}

function isBefore(el1, el2) {
  let cur;
  if (el2.parentNode === el1.parentNode) {
    for (cur = el1.previousSibling; cur; cur = cur.previousSibling) {
      if (cur === el2) return true;
    }
  }
  return false;
}

function cancelDefault(e) {
  e.preventDefault();
  e.stopPropagation();
  return false;
}

function addKey(event) {
  if(addItemLength() > 0 && event.keyCode == 13) {
    createListItem();
  }
}

function sortListBy() {
  const items = Array.from(getElement('list').children);
  getElement("stockage").value = items.map(e => e.innerText).join("|");
//   getElement("stockage").value = `["${items.map(e => e.innerText).join('","')}"]`;
}

document.getElementById('addCle').addEventListener('keydown', function(event) {
  if(event.keyCode == 13) createListItem();
});

document.getElementById('btn-save').addEventListener('click', function() {
    head('btn-save');
    sortListBy();
    _DATAS = formDatas();
    const operation = "Configuration";
    fetch(window.location.origin + `/configuration`, {
        method: "POST",
        body: JSON.stringify(_DATAS),
    }).then(async response => {
        if (response.status === 201) {
            modalRedirect(operation, "configuration sauvegardée", "./addConfiguration.html");
        } else {
            const resJson =  await response.json();
            modalError(operation, resJson.code + " : " + resJson.error);
        }
    }).catch(err => {
        modalError(operation, err);
    });
});