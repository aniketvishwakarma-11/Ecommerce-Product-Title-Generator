/**
 * Validate product input data
 * @param {Object} data - Product data to validate
 * @returns {Object} Validation result with isValid flag and error message
 */
function validateProductInput(data) {
  if (!data) {
    return { isValid: false, error: 'No data provided' };
  }

  const { product_name, category, features, audience } = data;

  // Check required fields
  if (!product_name || typeof product_name !== 'string' || product_name.trim().length === 0) {
    return { isValid: false, error: 'Product name is required and must be a non-empty string' };
  }

  if (!category || typeof category !== 'string' || category.trim().length === 0) {
    return { isValid: false, error: 'Category is required and must be a non-empty string' };
  }

  if (!features || typeof features !== 'string' || features.trim().length === 0) {
    return { isValid: false, error: 'Key features are required and must be a non-empty string' };
  }

  if (!audience || typeof audience !== 'string' || audience.trim().length === 0) {
    return { isValid: false, error: 'Target audience is required and must be a non-empty string' };
  }

  // Check string lengths (prevent abuse)
  if (product_name.length > 200) {
    return { isValid: false, error: 'Product name is too long (max 200 characters)' };
  }

  if (category.length > 200) {
    return { isValid: false, error: 'Category is too long (max 200 characters)' };
  }

  if (features.length > 500) {
    return { isValid: false, error: 'Features description is too long (max 500 characters)' };
  }

  if (audience.length > 200) {
    return { isValid: false, error: 'Target audience is too long (max 200 characters)' };
  }

  return { isValid: true };
}

module.exports = {
  validateProductInput
};
