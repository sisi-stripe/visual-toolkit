#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

// Get current branch
function getCurrentBranch() {
  try {
    return execSync('git branch --show-current', { encoding: 'utf8' }).trim();
  } catch (error) {
    console.error('Error getting current branch:', error.message);
    process.exit(1);
  }
}

// Deploy function
function deploy(targetBranch = null) {
  const currentBranch = getCurrentBranch();
  
  try {
    console.log(`🚀 Starting deployment...`);
    
    if (targetBranch && targetBranch !== currentBranch) {
      console.log(`📋 Switching from ${currentBranch} to ${targetBranch}`);
      execSync(`git checkout ${targetBranch}`, { stdio: 'inherit' });
    }
    
    const deployBranch = targetBranch || currentBranch;
    console.log(`🏗️  Building from ${deployBranch} branch...`);
    execSync('npm run build', { stdio: 'inherit' });
    
    console.log(`📤 Deploying ${deployBranch} to GitHub Pages...`);
    execSync('gh-pages -d dist --dotfiles', { stdio: 'inherit' });
    
    console.log(`✅ Successfully deployed ${deployBranch} to GitHub Pages!`);
    
    // Switch back to original branch if we changed
    if (targetBranch && targetBranch !== currentBranch) {
      console.log(`🔄 Switching back to ${currentBranch}`);
      execSync(`git checkout ${currentBranch}`, { stdio: 'inherit' });
    }
    
  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
    
    // Try to switch back to original branch
    if (targetBranch && targetBranch !== currentBranch) {
      try {
        execSync(`git checkout ${currentBranch}`, { stdio: 'inherit' });
      } catch (switchError) {
        console.error('Failed to switch back to original branch:', switchError.message);
      }
    }
    
    process.exit(1);
  }
}

// Parse command line arguments
const args = process.argv.slice(2);
const targetBranch = args[0];

if (targetBranch && !['main', 'demo'].includes(targetBranch)) {
  console.error('❌ Invalid branch. Use: main, demo, or no argument for current branch');
  process.exit(1);
}

deploy(targetBranch);
