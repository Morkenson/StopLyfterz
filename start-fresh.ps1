# Script to start with a completely fresh git repository
# This removes all history and starts clean

Write-Host "This will DELETE all git history and start fresh!" -ForegroundColor Red
Write-Host "Your code will be preserved, but all commits will be gone." -ForegroundColor Yellow
Write-Host ""
$confirm = Read-Host "Continue? (yes/no)"

if ($confirm -eq "yes") {
    Write-Host "`nBacking up current .git folder..." -ForegroundColor Yellow
    if (Test-Path ".git") {
        Move-Item .git .git.backup -Force
        Write-Host "Backup created: .git.backup" -ForegroundColor Green
    }
    
    Write-Host "`nInitializing fresh repository..." -ForegroundColor Yellow
    git init
    git add -A
    git commit -m "Initial commit - StopLyfterz application

Built by: Noah Laures, Troy Dvorak, Charlene Wendt, Zach Mork

Features:
- React + TypeScript frontend
- Supabase backend integration
- Business verification system
- Shoplifter tracking functionality
- Cypress E2E testing"
    
    Write-Host "`nFresh repository created!" -ForegroundColor Green
    Write-Host "`nNext steps:" -ForegroundColor Cyan
    Write-Host "1. Create a new repository on GitHub" -ForegroundColor White
    Write-Host "2. Run: git remote add origin <your-new-repo-url>" -ForegroundColor White
    Write-Host "3. Run: git push -u origin main" -ForegroundColor White
    Write-Host ""
    Write-Host "Old history backed up in: .git.backup (you can delete this later)" -ForegroundColor Gray
} else {
    Write-Host "Cancelled." -ForegroundColor Red
}

