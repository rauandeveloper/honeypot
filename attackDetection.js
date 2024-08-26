function detectAttack(message) {
    if (message.includes('union select') || message.includes('select * from')) {
        return 'SQL Injection';
    }
    if (message.includes('brute force') || message.includes('login attempt')) {
        return 'Brute Force Attack';
    }
    return 'Unknown';
}

module.exports = { detectAttack };
