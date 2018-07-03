module.exports = function(currentHealth) {
    if (currentHealth <= 6) return currentHealth + 3;
    return 10;
}
