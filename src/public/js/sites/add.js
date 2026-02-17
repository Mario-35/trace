
// Form validation functions
function validateSite() {
    if (validateStr('nom') === false) return false;
    if (validateStr('pays') === false) return false;
    if (validateStr('region') === false) return false;
    if (validateStr('pointx') === false) return false;
    if (validateStr('pointy') === false) return false;
    return true;
}



