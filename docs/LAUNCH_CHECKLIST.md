# InCity Research Platform - Launch Day Checklist

A step-by-step guide to deploying the platform to production.

---

## Pre-Launch Requirements

- [ ] All tests passing locally (`npm test` and `npm run test:e2e`)
- [ ] Build completes without errors (`npm run build`)
- [ ] Code pushed to GitHub repository
- [ ] Sanity project created at [sanity.io/manage](https://sanity.io/manage)

---

## Step 1: Create Sanity Project

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Click **"Create new project"**
3. Name it: `InCity Research Platform`
4. Select dataset: `production`
5. Note down your:
   - **Project ID**: (e.g., `abc123xyz`)
   - **Dataset**: `production`

---

## Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Configure the project:
   - Framework Preset: `Next.js`
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

---

## Step 3: Set Environment Variables in Vercel

**CRITICAL**: Add these environment variables in Vercel Dashboard:

| Variable Name | Value | Environment |
|---------------|-------|-------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Your Sanity Project ID | Production, Preview, Development |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | Production, Preview, Development |
| `SANITY_API_TOKEN` | Your Sanity API Token (for seeding) | Production |

### How to add:
1. In Vercel, go to **Project Settings** → **Environment Variables**
2. Add each variable with the correct value
3. Select all environments (Production, Preview, Development)
4. Click **Save**

---

## Step 4: Configure Sanity CORS Origins

**CRITICAL**: This step is required for the CMS to work in production!

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Navigate to **API** → **CORS origins**
4. Click **"Add CORS origin"**
5. Add the following origins:

| Origin | Allow Credentials |
|--------|-------------------|
| `https://your-project.vercel.app` | Yes |
| `https://your-custom-domain.com` (if applicable) | Yes |
| `http://localhost:3000` | Yes |

**Without this step, the Sanity Studio will fail to load in production!**

---

## Step 5: Generate Sanity API Token

1. In Sanity Dashboard, go to **API** → **Tokens**
2. Click **"Add API token"**
3. Name: `Production Write Token`
4. Permissions: **Editor** (for seeding data)
5. Copy the token and add it to Vercel as `SANITY_API_TOKEN`

---

## Step 6: Trigger Initial Deployment

1. In Vercel, go to **Deployments**
2. Click **"Redeploy"** on the latest deployment
3. Wait for the build to complete
4. Visit your production URL to verify

---

## Step 7: Seed Initial Data (Optional)

If you want to populate the CMS with sample data:

```bash
# Set environment variables locally
export NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id"
export NEXT_PUBLIC_SANITY_DATASET="production"
export SANITY_API_TOKEN="your-write-token"

# Run the seeding script
npm run seed
```

---

## Step 8: Verify Production Site

Test all critical functionality:

- [ ] Homepage loads correctly
- [ ] Navigation works (Projects, Publications, People)
- [ ] Sanity Studio accessible at `/studio`
- [ ] Can log into Sanity Studio
- [ ] Can create/edit content in CMS
- [ ] Content changes appear on live site

---

## Step 9: Set Up GitHub Secrets (for CI/CD)

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Add repository secrets:

| Secret Name | Value |
|-------------|-------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Your Sanity Project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |

---

## Post-Launch Checklist

- [ ] Verify CI/CD pipeline runs on push to main
- [ ] Test that failed builds block deployment
- [ ] Share CMS access with team members
- [ ] Distribute CMS User Guide (`docs/CMS_MANUAL.md`)
- [ ] Set up monitoring/analytics (optional)

---

## Troubleshooting

### "Failed to fetch" errors in Sanity Studio
- **Cause**: CORS origins not configured
- **Fix**: Add your production URL to Sanity CORS origins (Step 4)

### Content not appearing on site
- **Cause**: Missing environment variables
- **Fix**: Verify `NEXT_PUBLIC_SANITY_PROJECT_ID` is set in Vercel

### Build fails in CI
- **Cause**: Missing GitHub secrets
- **Fix**: Add Sanity credentials to GitHub repository secrets (Step 9)

### Sanity Studio shows "Unauthorized"
- **Cause**: Not logged into Sanity
- **Fix**: Log in with your Sanity account at `/studio`

---

## Support Contacts

- **Technical Issues**: [Development Team Email]
- **CMS Help**: Refer to `docs/CMS_MANUAL.md`
- **Sanity Documentation**: [sanity.io/docs](https://www.sanity.io/docs)
- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)

---

*Last updated: January 2026*
