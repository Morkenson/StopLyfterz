# Security Checklist for Public GitHub Repository

## ⚠️ CRITICAL ACTIONS REQUIRED BEFORE MAKING THIS REPO PUBLIC

### 1. 🔴 IMMEDIATE: Rotate Supabase Credentials

Your Supabase credentials were tracked in git and are now in the repository history. **You MUST rotate these credentials immediately:**

**Exposed Credentials:**
- Supabase URL: `https://emgrhbaltiiogjxmsxgx.supabase.co`
- Supabase Anon Key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (JWT token)

**Steps to Rotate:**
1. Go to your Supabase project dashboard: https://app.supabase.com/project/emgrhbaltiiogjxmsxgx/settings/api
2. Generate new API keys (you may need to create a new project or contact Supabase support)
3. Update your local `.env` file with the new credentials
4. **DO NOT commit the new .env file**

### 2. 🔴 CRITICAL: Clean Git History

The `.env` file has been removed from tracking, but it still exists in your git history. Anyone who clones the repo can access the old credentials. You have two options:

**Option A: Remove from History (Recommended if not yet pushed publicly)**
```bash
# Use git filter-repo (safer than filter-branch)
# Install: pip install git-filter-repo
cd "C:\VS Code\stoplyfters"
git filter-repo --path StopLyfterz/.env --invert-paths

# Force push to update remote (if already pushed)
git push origin --force --all
```

**Option B: Start Fresh (Safest)**
1. Create a new repository on GitHub
2. Copy your code (excluding `.env`) to a new directory
3. Initialize a new git repository
4. Push to the new remote

### 3. ✅ Changes Made to Secure the Repository

The following security improvements have been implemented:

#### Updated `.gitignore`
- Added comprehensive `.env` file patterns to prevent future commits
- Patterns added:
  ```
  .env
  .env.local
  .env.development.local
  .env.test.local
  .env.production.local
  ```

#### Removed Hardcoded Personal Information
- **Register.tsx**: Removed hardcoded admin email (`morkzachb@gmail.com`)
  - Line 16 now uses an empty array: `const adminList: string[] = [];`
  - **TODO**: Configure admin emails via environment variables or database

#### Sanitized Test Files
- **cypress/e2e/Add_Card.cy.ts**: Replaced real email with generic test credentials
  - Changed from: `morkzach@gmail.com` / `123456`
  - Changed to: `test-user@example.com` / `test-password-123`
  - **TODO**: Create a dedicated test account for Cypress tests

#### Added Environment Template
- Created `env.example` with placeholder values
- Updated README with setup instructions

#### Enhanced README
- Added detailed build instructions
- Added security notes about environment variables
- Added prerequisites and setup steps

### 4. 📋 Additional Security Recommendations

#### Remove Debug Logging (Optional but Recommended)
Console.log statements may expose sensitive data in production:
- `StopLyfterz/src/dbController.ts` (lines 7, 88) - logs user data
- Consider using a proper logging library with environment-based levels
- Remove or wrap in `if (process.env.NODE_ENV === 'development')` blocks

#### Admin Email Management
Current state: Admin list is hardcoded and empty in `Register.tsx`

**Recommended approaches:**
1. **Environment Variable:**
   ```typescript
   const adminList = (import.meta.env.VITE_ADMIN_EMAILS || '').split(',');
   ```

2. **Database Table:**
   - Create an `admin_emails` table in Supabase
   - Query on registration to check admin status

3. **Supabase RLS Policies:**
   - Use Supabase Row Level Security to manage admin roles
   - More secure than client-side checks

#### Test Credentials
The Cypress test now uses placeholder credentials. You should:
1. Create a dedicated test user in your Supabase project
2. Store test credentials in environment variables:
   ```
   CYPRESS_TEST_EMAIL=test@example.com
   CYPRESS_TEST_PASSWORD=secure-test-password
   ```
3. Update Cypress config to use these variables

### 5. ✅ Pre-Push Checklist

Before pushing to public GitHub, verify:

- [ ] Supabase credentials have been rotated
- [ ] New `.env` file is NOT in git tracking (`git status` shows no .env)
- [ ] `.gitignore` includes `.env` patterns
- [ ] Git history has been cleaned (or new repo created)
- [ ] No personal emails in source code
- [ ] Test files use generic test accounts
- [ ] README includes proper setup instructions
- [ ] All sensitive data removed from all files

### 6. 📞 If Credentials Were Already Pushed to GitHub

If this repo is already public on GitHub with the exposed credentials:

1. **Immediately** rotate your Supabase credentials (see step 1)
2. Check Supabase logs for any unauthorized access
3. Review any data that may have been accessed
4. Consider the repository compromised and follow "Option B" above (start fresh)
5. Monitor your Supabase project for unusual activity

### 7. 🔒 Future Best Practices

- Never commit `.env` files
- Use environment variables for all secrets
- Add pre-commit hooks to prevent committing secrets
- Consider using tools like `git-secrets` or `trufflehog`
- Review diffs before committing
- Use separate credentials for development and production

---

## Status: Repository is NOT YET SAFE for public release

Complete steps 1 and 2 above before making this repository public.

