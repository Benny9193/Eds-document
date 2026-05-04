const { query, close } = require('./db');

async function main() {
  try {
    const result = await query('SELECT DB_NAME() AS current_db, SUSER_SNAME() AS login_name');
    const row = result.recordset[0];
    console.log(`Connected as ${row.login_name} to database "${row.current_db}".`);
  } catch (err) {
    console.error('Database error:', err.message);
    process.exitCode = 1;
  } finally {
    await close();
  }
}

main();
