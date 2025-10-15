# Script to clean .env from git history
# Run this before pushing to new repository

Write-Host "Installing git-filter-repo (if needed)..." -ForegroundColor Yellow
pip install git-filter-repo

Write-Host "`nCleaning .env from git history..." -ForegroundColor Yellow
Write-Host "This will rewrite your git history to remove StopLyfterz/.env" -ForegroundColor Red
Write-Host ""
$confirm = Read-Host "Continue? (yes/no)"

if ($confirm -eq "yes") {
    git filter-repo --path StopLyfterz/.env --invert-paths --force
    Write-Host "`nHistory cleaned successfully!" -ForegroundColor Green
    Write-Host "The .env file has been removed from all commits." -ForegroundColor Green
    Write-Host "`nNext steps:" -ForegroundColor Cyan
    Write-Host "1. Create a new repository on GitHub" -ForegroundColor White
    Write-Host "2. Run: git remote add origin <your-new-repo-url>" -ForegroundColor White
    Write-Host "3. Run: git push -u origin main" -ForegroundColor White
} else {
    Write-Host "Cancelled." -ForegroundColor Red
}

