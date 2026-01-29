# TODO: Fix Vendor Page 404 on Vercel

## Completed Tasks
- [x] Add `generateStaticParams` function to `app/[vendorSlug]/page.tsx` to pre-generate static pages for all vendors
- [x] Fix fetch URL to use proper base URL for both development and production (VERCEL_URL for production, NEXT_PUBLIC_BASE_URL for development)
- [x] Import mockVendors data for static generation

## Summary
The issue was that Next.js App Router requires `generateStaticParams` for dynamic routes to pre-generate pages at build time for production deployments like Vercel. On localhost, pages are generated on-demand, but Vercel needs them pre-built.

Changes made:
- Added `generateStaticParams()` that returns static params for vendor slugs: 'vendor-a', 'vendor-b', 'vendor-c'
- Fixed fetch URL to use VERCEL_URL for production and NEXT_PUBLIC_BASE_URL for development (relative URLs don't work in SSR)
- Imported mockVendors for static generation

This should resolve the 404 errors on Vercel deployment.
