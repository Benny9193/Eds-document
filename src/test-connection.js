const { query, close } = require('./db');

async function main() {
  try {
    console.log('Testing connection to Azure SQL Server...');
    console.log(`Server: ${process.env.DB_SERVER}`);
    console.log(`Database: ${process.env.DB_DATABASE}`);
    console.log(`User: ${process.env.DB_USER}`);
    console.log('');

    const versionResult = await query('SELECT @@VERSION AS version');
    console.log('SQL Server version:');
    console.log(versionResult.recordset[0].version);
    console.log('');

    const dbResult = await query('SELECT name FROM sys.databases ORDER BY name');
    console.log(`Databases (${dbResult.recordset.length}):`);
    dbResult.recordset.forEach((row) => console.log(`  - ${row.name}`));
    console.log('');

    const nowResult = await query('SELECT SYSUTCDATETIME() AS now');
    console.log(`Server UTC time: ${nowResult.recordset[0].now}`);

    console.log('\nConnection test successful.');
  } catch (err) {
    console.error('Connection test failed:');
    console.error(err.message);
    if (err.originalError) {
      console.error('Original error:', err.originalError.message);
    }
    process.exitCode = 1;
  } finally {
    await close();
  }
}

main();
