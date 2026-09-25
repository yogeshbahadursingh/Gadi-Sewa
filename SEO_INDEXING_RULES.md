# SEO Indexing Rules - GadiBazar Nepal

## Overview
This document defines the indexing strategy for all pages on GadiBazar. It specifies which pages should be indexed by search engines, which should not be indexed, and which should be crawled but not indexed.

---

## Indexing Status Definitions

- **INDEX**: Page should appear in search results
- **NOINDEX**: Page should not appear in search results
- **NOFOLLOW**: Links on page should not be followed
- **NOCRAWL**: Page should not be crawled at all

---

## Pages That SHOULD Be Indexed ✅

### 1. Homepage (/)
**Status:** INDEX, FOLLOW
**Reason:** Primary landing page, high authority
**Canonical:** https://gadibazar.com/

### 2. Vehicle Listing Pages (/listing/:id)
**Status:** INDEX, FOLLOW
**Reason:** Unique content, high user value, transactional intent
**Canonical:** https://gadibazar.com/listing/:id
**Notes:** 
- Only index ACTIVE listings
- Remove from index when SOLD or EXPIRED
- Keep URL stable (no changes)

### 3. Vehicle Passport Pages (/passport/:passportId)
**Status:** INDEX, FOLLOW
**Reason:** Unique verification content, trust signal
**Canonical:** https://gadibazar.com/passport/:passportId
**Notes:**
- Only index passports with sufficient public information
- Never expose private owner data
- Keep URL stable

### 4. Inspection Report Pages (/inspection/:id)
**Status:** INDEX, FOLLOW
**Reason:** Unique inspection content, trust signal
**Canonical:** https://gadibazar.com/inspection/:id
**Notes:**
- Only index completed inspections
- Keep URL stable

### 5. Service Pages
**Status:** INDEX, FOLLOW
**Reason:** High-value service information
**Canonical:** Self-referencing

**Pages:**
- /inspect (Vehicle Inspection)
- /valuation (Vehicle Valuation)
- /finance (Vehicle Finance)
- /insurance (Vehicle Insurance)
- /transfer (Ownership Transfer)
- /partners (Service Partners)
- /verify (Verify Passport)

### 6. Sell Page (/sell)
**Status:** INDEX, FOLLOW
**Reason:** High-value seller acquisition page
**Canonical:** https://gadibazar.com/sell

### 7. Informational Pages
**Status:** INDEX, FOLLOW
**Reason:** Trust and authority building
**Canonical:** Self-referencing

**Pages:**
- /about (About Us)
- /blog (Blog)
- /safety (Safety Tips)
- /support (Support)
- /terms (Terms of Service)
- /privacy (Privacy Policy)
- /dealer-application (Dealer Application)

### 8. Category Pages (Future)
**Status:** INDEX, FOLLOW
**Reason:** High-value category landing pages
**Canonical:** Self-referencing

**Pages:**
- /cars (All cars)
- /motorcycles (All motorcycles)
- /electric-vehicles (All EVs)
- /cars/:make (Make pages)
- /cars/:make/:model (Model pages)
- /cars/:location (Location pages)

### 9. Blog Posts (Future)
**Status:** INDEX, FOLLOW
**Reason:** Informational content, authority building
**Canonical:** https://gadibazar.com/blog/:slug
**Notes:**
- Only publish high-quality, original content
- Minimum 1,500 words
- Include author information
- Add publication date

---

## Pages That Should NOT Be Indexed ❌

### 1. Search Results (/search)
**Status:** NOINDEX, NOFOLLOW
**Reason:** 
- Filter combinations create infinite URLs
- Low unique value
- Crawl budget waste
**Implementation:** `<meta name="robots" content="noindex, nofollow">`
**Canonical:** https://gadibazar.com/search (if indexed at all)

### 2. User Dashboards
**Status:** NOINDEX, NOFOLLOW
**Reason:** Private user content, no public value
**Implementation:** `<meta name="robots" content="noindex, nofollow">`

**Pages:**
- /dashboard
- /seller/*
- /buyer/*
- /inspector/*
- /dealer/*
- /profile
- /seller/analytics
- /dealer/inventory

### 3. Admin Pages
**Status:** NOINDEX, NOFOLLOW
**Reason:** Private administrative content
**Implementation:** `<meta name="robots" content="noindex, nofollow">`

**Pages:**
- /admin
- /admin/*
- /admin/risk
- /admin/listings
- /admin/users
- /admin/inspections
- /admin/payments
- /admin/audit-logs

### 4. User Action Pages
**Status:** NOINDEX, NOFOLLOW
**Reason:** Private user actions, no public value
**Implementation:** `<meta name="robots" content="noindex, nofollow">`

**Pages:**
- /messages
- /notifications
- /favorites
- /recently-viewed
- /saved-searches
- /compare
- /reservations
- /offers
- /payment

### 5. Form Submission Pages
**Status:** NOINDEX, NOFOLLOW
**Reason:** Transactional pages, no public value
**Implementation:** `<meta name="robots" content="noindex, nofollow">`

**Pages:**
- /test-drive/:id (booking confirmation)
- /repair-quotes/:inspectionId (quote request)
- /finance/apply (application submission)
- /insurance/apply (application submission)
- /report/:id (report submission)

### 6. Authentication Pages
**Status:** NOINDEX, NOFOLLOW
**Reason:** Authentication flows, no public value
**Implementation:** `<meta name="robots" content="noindex, nofollow">`

**Pages:**
- Login modal (not a separate page)
- Registration modal (not a separate page)
- Password reset (if exists)

### 7. Error Pages
**Status:** NOINDEX, NOFOLLOW
**Reason:** Error pages should not be indexed
**Implementation:** `<meta name="robots" content="noindex, nofollow">`

**Pages:**
- 404 pages
- 500 pages
- Other error pages

### 8. Test/Development Pages
**Status:** NOINDEX, NOFOLLOW
**Reason:** Not production content
**Implementation:** `<meta name="robots" content="noindex, nofollow">`

**Pages:**
- /button-test
- Any other test pages

---

## Pages That Should Be Crawled But Not Indexed 🔄

### 1. Filter Combinations (Future)
**Status:** CRAWL, NOINDEX
**Reason:** Allow discovery but prevent indexing
**Implementation:** 
- Allow crawling via robots.txt
- Add `<meta name="robots" content="noindex, follow">`
- Use canonical to main category page

**Example URLs:**
- /cars?make=toyota&year=2022
- /cars?price_min=1000000&price_max=2000000
- /cars?location=kathmandu&fuel=electric

### 2. Sort Variations
**Status:** CRAWL, NOINDEX
**Reason:** Allow discovery but prevent indexing
**Implementation:**
- Allow crawling via robots.txt
- Add `<meta name="robots" content="noindex, follow">`
- Canonical to default sort

**Example URLs:**
- /cars?sort=price_asc
- /cars?sort=year_desc
- /cars?sort=mileage_asc

### 3. Pagination (Future)
**Status:** CRAWL, INDEX (with caution)
**Reason:** Allow discovery of all vehicles
**Implementation:**
- Use rel="next" and rel="prev"
- Canonical to page 1 OR self-referencing
- Only index if each page has unique value

**Example URLs:**
- /cars?page=2
- /cars?page=3

---

## Robots.txt Configuration

```
User-agent: *
Allow: /

# Block private areas
Disallow: /admin
Disallow: /admin/*
Disallow: /dashboard
Disallow: /seller/*
Disallow: /buyer/*
Disallow: /inspector/*
Disallow: /dealer/*
Disallow: /profile
Disallow: /messages
Disallow: /notifications
Disallow: /payment
Disallow: /reservations
Disallow: /offers
Disallow: /favorites
Disallow: /recently-viewed
Disallow: /saved-searches
Disallow: /compare
Disallow: /button-test

# Block search filters (but allow search page)
Disallow: /search?*
Disallow: /*?*sort=*
Disallow: /*?*filter=*

# Allow search page itself
Allow: /search

# Crawl-delay
Crawl-delay: 1

# Sitemap
Sitemap: https://gadibazar.com/sitemap.xml
```

---

## Sitemap Strategy

### Sitemap Index Structure
```
sitemap-index.xml
├── sitemap-pages.xml (static pages)
├── sitemap-vehicles.xml (vehicle listings)
├── sitemap-passports.xml (vehicle passports)
├── sitemap-inspections.xml (inspection reports)
├── sitemap-services.xml (service pages)
├── sitemap-blog.xml (blog posts)
└── sitemap-locations.xml (location pages - future)
```

### What to Include in Sitemap

**INCLUDE:**
- All INDEX pages
- Only canonical URLs
- Only HTTP 200 pages
- Accurate lastmod dates
- Appropriate priority and changefreq

**EXCLUDE:**
- NOINDEX pages
- Redirects (301/302)
- 404 pages
- Private pages
- Filter combinations
- Sort variations
- Pagination (unless indexed)

### Sitemap Update Frequency
- **Vehicle listings:** Daily (when vehicles added/sold)
- **Static pages:** Weekly
- **Blog posts:** When published
- **Passports:** When created/updated
- **Inspections:** When completed

---

## Canonical URL Strategy

### Self-Referencing Canonicals
Most pages should have self-referencing canonicals:
```html
<link rel="canonical" href="https://gadibazar.com/page-url" />
```

### Cross-Page Canonicals
Use when content is duplicated:

**Example 1: Filtered search**
```html
<!-- /cars?make=toyota -->
<link rel="canonical" href="https://gadibazar.com/cars" />
```

**Example 2: Sorted results**
```html
<!-- /cars?sort=price -->
<link rel="canonical" href="https://gadibazar.com/cars" />
```

**Example 3: Pagination**
```html
<!-- /cars?page=2 -->
<link rel="canonical" href="https://gadibazar.com/cars?page=2" />
<!-- OR -->
<link rel="canonical" href="https://gadibazar.com/cars" />
```

### Canonical Rules
1. Always use absolute URLs (https://gadibazar.com/...)
2. Always use lowercase
3. Always use trailing slash consistently
4. Never canonicalize to a different domain
5. Never canonicalize NOINDEX pages to INDEX pages

---

## Sold/Expired Vehicle Strategy

### When Vehicle is SOLD

**Option 1: Keep Page (Recommended)**
- Status: INDEX, FOLLOW
- Add "SOLD" badge to page
- Keep all content
- Add "Similar Vehicles" section
- Keep in sitemap
- **Reason:** Preserves link equity, provides value

**Option 2: Remove from Index**
- Status: NOINDEX, FOLLOW
- Keep page accessible
- Remove from sitemap
- Add "SOLD" badge
- **Reason:** Prevents confusion, still preserves links

**Option 3: Redirect (Not Recommended)**
- Status: 301 redirect to similar vehicles
- **Reason:** Loses link equity, confuses users

### When Vehicle is EXPIRED

**Option 1: Keep Page (If Recently Expired)**
- Status: INDEX, FOLLOW
- Add "Listing Expired" notice
- Keep for 30 days
- **Reason:** Seller may renew

**Option 2: Remove from Index (After 30 Days)**
- Status: NOINDEX, FOLLOW
- Remove from sitemap
- Keep page accessible
- **Reason:** Prevents stale content

**Option 3: 410 Gone (If Never Renewed)**
- Status: 410 HTTP status
- Remove from sitemap
- **Reason:** Clear signal to search engines

---

## Duplicate Content Prevention

### Common Duplicate Content Issues

**1. WWW vs Non-WWW**
**Solution:** 301 redirect all www to non-www (or vice versa)
```apache
RewriteCond %{HTTP_HOST} ^www\.gadibazar\.com [NC]
RewriteRule ^(.*)$ https://gadibazar.com/$1 [L,R=301]
```

**2. HTTP vs HTTPS**
**Solution:** 301 redirect all HTTP to HTTPS
```apache
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

**3. Trailing Slash**
**Solution:** Choose one format and redirect
```apache
# Remove trailing slash
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)/$ /$1 [L,R=301]
```

**4. URL Parameters**
**Solution:** Use canonical URLs, block in robots.txt
```
Disallow: /*?*sort=*
Disallow: /*?*filter=*
```

**5. Session IDs**
**Solution:** Remove session IDs from URLs
**Implementation:** Configure application to not use session IDs in URLs

**6. Printer-Friendly Pages**
**Solution:** Use canonical to main page
```html
<link rel="canonical" href="https://gadibazar.com/main-page" />
```

---

## Hreflang Strategy (Future)

### When to Implement
- When adding Nepali language support
- When targeting multiple regions

### Implementation
```html
<!-- English version -->
<link rel="alternate" hreflang="en" href="https://gadibazar.com/page" />
<link rel="alternate" hreflang="en-NP" href="https://gadibazar.com/page" />

<!-- Nepali version -->
<link rel="alternate" hreflang="ne" href="https://gadibazar.com/ne/page" />
<link rel="alternate" hreflang="ne-NP" href="https://gadibazar.com/ne/page" />

<!-- x-default (fallback) -->
<link rel="alternate" hreflang="x-default" href="https://gadibazar.com/page" />
```

### URL Structure
```
English: https://gadibazar.com/page
Nepali: https://gadibazar.com/ne/page
```

---

## Monitoring & Maintenance

### Weekly Tasks
- [ ] Check Search Console for indexing issues
- [ ] Review crawl errors
- [ ] Monitor sitemap status
- [ ] Check for broken links

### Monthly Tasks
- [ ] Review indexed pages count
- [ ] Audit canonical URLs
- [ ] Check for duplicate content
- [ ] Review robots.txt effectiveness
- [ ] Update sitemap with new pages
- [ ] Remove sold/expired vehicles from sitemap

### Quarterly Tasks
- [ ] Full SEO audit
- [ ] Review indexing strategy
- [ ] Update keyword map
- [ ] Analyze search performance
- [ ] Adjust strategy based on data

---

## Implementation Checklist

### Immediate (Week 1)
- [ ] Add NOINDEX to search results page
- [ ] Add NOINDEX to all dashboard pages
- [ ] Add NOINDEX to all admin pages
- [ ] Add NOINDEX to all user action pages
- [ ] Verify robots.txt is blocking private areas
- [ ] Verify sitemap only includes INDEX pages
- [ ] Add canonical URLs to all pages

### Short-term (Week 2-4)
- [ ] Implement canonical strategy for filters
- [ ] Implement canonical strategy for sorting
- [ ] Plan pagination strategy
- [ ] Create sold vehicle strategy
- [ ] Create expired vehicle strategy

### Long-term (Month 2+)
- [ ] Implement hreflang (when adding Nepali)
- [ ] Create location pages with proper indexing
- [ ] Create make/model pages with proper indexing
- [ ] Implement advanced canonical strategies
- [ ] Monitor and adjust based on performance

---

## Summary Table

| Page Type | Index | Follow | Crawl | Canonical | Notes |
|-----------|-------|--------|-------|-----------|-------|
| Homepage | ✅ | ✅ | ✅ | Self | High priority |
| Vehicle Listings | ✅ | ✅ | ✅ | Self | Only ACTIVE |
| Passports | ✅ | ✅ | ✅ | Self | Public only |
| Inspections | ✅ | ✅ | ✅ | Self | Completed only |
| Service Pages | ✅ | ✅ | ✅ | Self | High value |
| Informational | ✅ | ✅ | ✅ | Self | Trust building |
| Search Results | ❌ | ❌ | ✅ | Self | Prevent bloat |
| Dashboards | ❌ | ❌ | ❌ | N/A | Private |
| Admin | ❌ | ❌ | ❌ | N/A | Private |
| User Actions | ❌ | ❌ | ✅ | N/A | Private |
| Filters | ❌ | ✅ | ✅ | Main | Prevent bloat |
| Sort | ❌ | ✅ | ✅ | Default | Prevent bloat |
| Pagination | ⚠️ | ✅ | ✅ | Varies | Case by case |

---

**Document Version:** 1.0
**Last Updated:** 2026-01-15
**Next Review:** 2026-02-15
