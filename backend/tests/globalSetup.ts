const { execSync } = require('child_process');
const path = require('path');

module.exports = async () => {
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is not defined. Please set it in .env.test.');
    process.exit(1);
  }

  try {
    console.log('🚀 Resetting and syncing test database...');
    execSync('npx prisma db push --force-reset', {
      stdio: 'inherit',
    });
  } catch (err) {
    console.error('❌ Failed to setup test DB:', err);
    process.exit(1);
  }
};
