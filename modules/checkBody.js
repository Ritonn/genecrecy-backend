function checkBody(body, keys) {
    const errors = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    for (const field of keys) {
      if (!body[field] || body[field] === '') {
      errors.push(`${field} est requis`);
      continue;
      }
      if (field === 'email' && !emailRegex.test(body[field])) {
        errors.push('Format d\'email invalide');
    }
    }
  
    return {
    isValid: errors.length === 0, // est true s'il n'y a pas d'erreurs dans l'array uniquement
    errors: errors
   };

  }
  
  module.exports = { checkBody };
  