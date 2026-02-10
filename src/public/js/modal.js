
function modalError(title, message) {
    document.getElementById("modal").innerHTML = `
    <label class="modal-close" id="closeX">&#x2715;</label>
    <h2>${title}</h2><hr />
    <p>${message}</p> 
    <label class="modal-content-btn" id="close">OK</label>`;
    document.getElementById('closeX').addEventListener('click', function() {
        document.getElementById("modal-toggle").classList.remove('active');
    });
    document.getElementById('close').addEventListener('click', function() {
        document.getElementById("modal-toggle").classList.remove('active');
    });
    document.getElementById('close').addEventListener('click', function() {
        document.getElementById("modal-toggle").classList.remove('active');
    });
    document.getElementById('modal-ouside').addEventListener('click', function() {
        document.getElementById("modal-toggle").classList.remove('active');
    });
    document.getElementById("modal-toggle").classList.add('active');
};

function modalRedirect(title, message, redirect) {    
    document.getElementById("modal").innerHTML = `
    <a href="${redirect}"><label class="modal-close">&#x2715;</label></a>
    <h2>${title}</h2><hr />
    <p>${message}</p> 
    <a href="${redirect}"><label class="modal-content-btn">OK</label></a>`;
    document.getElementById("modal-toggle").classList.add('active');
}