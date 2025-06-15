# Troubleshooting Guide

This document outlines common issues encountered during the setup and running of this project, along with their solutions.

## Error: `&&` is not a valid statement separator in this version (PowerShell)

**Problem:** When trying to run `cd project && npm run dev` in PowerShell, the `&&` operator is not recognized for chaining commands.

**Solution:** Execute the commands sequentially:

1. Change directory:
   ```powershell
   Set-Location -Path project
   ```

2. Then run the development server:
   ```powershell
   npm run dev
   ```

## Error: `'vite' is not recognized as an internal or external command`

**Problem:** The `vite` command, used by `npm run dev`, is not found, indicating that project dependencies might not be fully installed or linked.

**Solution:** Reinstall the project dependencies to ensure all necessary executables and modules are correctly installed:

1. Navigate to the `project` directory (if not already there):
   ```powershell
   Set-Location -Path project
   ```

2. Reinstall dependencies:
   ```powershell
   npm install
   ```

After reinstalling, you can try running `npm run dev` again. 