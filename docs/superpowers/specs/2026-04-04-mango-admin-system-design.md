# MangoMasti Admin & Database System Design

**Date**: 2026-04-04
**Status**: Approved
**Author**: Claude Code

## Overview

Transform the MangoMasti website from hardcoded mango data to a fully database-driven system with an admin panel for content management. Remove Gallery and Related Products sections, add mango image modals with carousel, and implement flexible display configuration.

## Goals

1. **Database-driven mango catalog** - Move from hardcoded `lib/mangoes.ts` to PostgreSQL
2. **Admin panel** - CRUD operations for mangoes with authentication
3. **Image modal** - Clickable mango cards open modal with image carousel and details
4. **Flexible UI configuration** - Admin can toggle which fields display on cards/modals
5. **Simplified navigation** - Remove Gallery and Related Products pages
6. **E-commerce pricing** - Show original + discounted prices with strikethrough

## Non-Goals

- Multi-admin user management (single admin account for now)
- Image CDN/external storage (using base64 in database)
- Public API for external consumers
- Advanced analytics or reporting

---

## Database Schema

### 1. `mangoes` Table

```typescript
{
  id: serial PRIMARY KEY,
  name: varchar(100) NOT NULL,
  slug: varchar(100) UNIQUE NOT NULL,
  description: text NOT NULL,
  longDescription: text NOT NULL,
  images: text[] NOT NULL,              // Array of base64-encoded WebP images
  season: varchar(100),                 // e.g., "April – June"
  origin: varchar(100),                 // e.g., "Maharashtra, India"
  taste: varchar(200),                  // e.g., "Sweet, Rich & Creamy"
  tags: text[],                         // e.g., ["Premium", "GI Tagged"]
  featured: boolean DEFAULT false,
  originalPrice: integer,               // Price in paise (50000 = ₹500.00)
  discountedPrice: integer NOT NULL,    // Price in paise
  createdAt: timestamp DEFAULT now(),
  updatedAt: timestamp DEFAULT now()
}
```

### 2. `admin_users` Table

```typescript
{
  id: serial PRIMARY KEY,
  username: varchar(100) UNIQUE NOT NULL,
  passwordHash: text NOT NULL,          // bcrypt hashed (10 rounds)
  createdAt: timestamp DEFAULT now()
}
```

### 3. `admin_sessions` Table

```typescript
{
  id: serial PRIMARY KEY,
  userId: integer REFERENCES admin_users(id) ON DELETE CASCADE,
  token: varchar(255) UNIQUE NOT NULL,
  expiresAt: timestamp NOT NULL,
  createdAt: timestamp DEFAULT now()
}
```

### 4. `site_config` Table

```typescript
{
  id: serial PRIMARY KEY,
  key: varchar(100) UNIQUE NOT NULL,    // e.g., "show_season", "show_origin"
  value: text NOT NULL,                 // JSON or boolean string
  type: varchar(50) NOT NULL,           // "boolean", "text", "json"
  description: text,
  updatedAt: timestamp DEFAULT now()
}
```

**Initial Config Keys**:
- `show_season` (boolean) - Display season on cards/modal
- `show_origin` (boolean) - Display origin on cards/modal
- `show_taste` (boolean) - Display taste tags on cards/modal
- `show_description_on_card` (boolean) - Show short description on mango cards
- `show_original_price` (boolean) - Show strikethrough original price

---

## Architecture

### Technology Stack

- **Framework**: Next.js 16.2.1 (App Router)
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Session-based with httpOnly cookies
- **Image Processing**: Sharp (resize, compress, WebP conversion)
- **Deployment**: Vercel

### Server Actions

All database mutations and authentication handled via Next.js Server Actions:

**`app/actions/mangoes.ts`**:
- `getMangoes()` - Fetch all mangoes
- `getMangoBySlug(slug)` - Fetch single mango
- `createMango(data)` - Admin only
- `updateMango(id, data)` - Admin only
- `deleteMango(id)` - Admin only

**`app/actions/auth.ts`**:
- `login(username, password)` - Validate credentials, create session
- `logout()` - Destroy session
- `verifySession()` - Check if session valid

**`app/actions/config.ts`**:
- `getConfig()` - Fetch all config settings
- `updateConfig(key, value)` - Admin only

---

## Image Processing Pipeline

### Upload Flow

1. **Client side**: Admin selects image file(s) in browser
2. **Validation**:
   - File type: JPG, PNG, WebP only
   - Max file size: 10MB (raw upload)
3. **Server action**: Receive file buffer
4. **Sharp processing**:
   ```javascript
   sharp(buffer)
     .resize(800, null, { withoutEnlargement: true })
     .webp({ quality: 80 })
     .toBuffer()
   ```
   - Resize to max 800px width (maintain aspect ratio)
   - Convert to WebP format
   - Compress to quality 80
   - Target output: 50-150KB per image
5. **Encode**: Convert buffer to base64 string
6. **Store**: Insert into `mangoes.images` array column

### Why Base64 in Database?

- **Vercel compatible**: No filesystem dependency in serverless
- **Sharp compression**: Images reduced to ~100KB each
- **Simplicity**: No external storage service needed
- **Acceptable for scale**: 15 mangoes × 3 images × 100KB = ~4.5MB total

---

## Navigation Updates

### Updated Navbar Links

**Remove**:
- Gallery
- Mango Related Products

**Keep**:
- Home
- Our Mangoes (varieties page)
- Reviews
- About Us

### File Changes

- Update `src/app/components/Navbar.tsx` - remove links
- Archive/delete `src/app/gallery/page.tsx`
- Archive/delete `src/app/related-products/page.tsx`

---

## Mango Card & Modal Design

### Mango Card Component

**Used on**: Home page (featured) and `/varieties` page (all)

**Layout**:
```
┌─────────────────────────┐
│  [Mango Image]          │
│  ⭐ Featured (if true)  │
├─────────────────────────┤
│  Alphonso Mango         │
│  ₹400  ₹500 (strike)    │ ← If show_original_price enabled
│  Short description...   │ ← If show_description_on_card enabled
│  [Sweet] [Creamy]       │ ← If show_taste enabled
└─────────────────────────┘
   ↓ Click anywhere to open modal
```

**Interactions**:
- Click card → Open modal with mango details
- Entire card is clickable

### Mango Modal

**Layout**:
```
┌────────────────────────────────────────────┐
│  ✕ Close                                   │
│                                            │
│  ┌──────────────────┐   Alphonso Mango    │
│  │                  │   ₹400  ₹500        │
│  │   Carousel       │                     │
│  │   ← [Image] →    │   Rich, creamy      │
│  │   • • •          │   texture with      │
│  │                  │   extraordinary     │
│  └──────────────────┘   sweetness...      │
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │  📱 Order on WhatsApp                │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  Season: April – June (if enabled)        │
│  Origin: Maharashtra (if enabled)         │
│  Tags: [Premium] [GI Tagged]              │
└────────────────────────────────────────────┘
```

**Features**:
- **Image carousel**: Navigate with ← → buttons or swipe (mobile)
- **Dots indicator**: Show current image (1 of 3)
- **Responsive**: Full screen on mobile, centered on desktop
- **Close**: Click outside modal or press ESC key
- **WhatsApp CTA**: Pre-filled message with mango details

**Technical Implementation**:
- Client component with `useState` for carousel
- `useEffect` for ESC key listener
- Backdrop click handler
- CSS transitions for smooth animations

---

## Admin Panel

### Routes

- `/admin/login` - Public login page
- `/admin` - Dashboard (redirects to login if not authenticated)
- `/admin/mangoes` - Mango CRUD management
- `/admin/settings` - Display configuration

### Authentication Flow

1. Admin visits `/admin/login`
2. Enter username and password
3. Server action:
   ```javascript
   // app/actions/auth.ts
   async function login(username: string, password: string) {
     // 1. Find user by username
     const user = await db.query.adminUsers.findFirst({
       where: eq(adminUsers.username, username)
     });

     // 2. Verify password with bcrypt
     const valid = await bcrypt.compare(password, user.passwordHash);
     if (!valid) throw new Error("Invalid credentials");

     // 3. Create session token
     const token = crypto.randomBytes(32).toString('hex');
     const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

     // 4. Store session in DB
     await db.insert(adminSessions).values({
       userId: user.id,
       token,
       expiresAt
     });

     // 5. Set httpOnly cookie
     cookies().set('admin_session', token, {
       httpOnly: true,
       secure: true,
       sameSite: 'lax',
       expires: expiresAt
     });

     return { success: true };
   }
   ```
4. Redirect to `/admin`

### Protected Route Middleware

```javascript
// middleware.ts
export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin') &&
      request.nextUrl.pathname !== '/admin/login') {

    const token = request.cookies.get('admin_session')?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Verify session exists and not expired
    const session = await db.query.adminSessions.findFirst({
      where: and(
        eq(adminSessions.token, token),
        gt(adminSessions.expiresAt, new Date())
      )
    });

    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}
```

### Mango Management (`/admin/mangoes`)

**List View**:
- Table showing all mangoes: name, price, featured status, actions
- "Add New Mango" button
- Edit/Delete icons for each row

**Add/Edit Form**:
```
Name: [Input]
Slug: [Auto-generated from name, editable]

Short Description:
[Textarea]

Long Description:
[Textarea]

Images:
[File upload - multiple] → Shows preview thumbnails
- Click to remove
- Drag to reorder

Season: [Input] (optional)
Origin: [Input] (optional)
Taste: [Input] (optional)

Tags:
[Tag input - add/remove]

☑ Featured

Original Price: ₹ [Input]
Discounted Price: ₹ [Input]

[Cancel] [Save Mango]
```

**Form Validation**:
- Name required, max 100 chars
- Slug required, unique, URL-safe
- Description required
- At least 1 image required
- Discounted price required, must be positive
- Original price optional, must be > discounted if set

**Image Upload Handling**:
```javascript
// Client side
async function handleImageUpload(files: FileList) {
  const formData = new FormData();
  for (const file of files) {
    formData.append('images', file);
  }

  const result = await processImages(formData);
  // result = { base64Images: string[] }

  setImages(prev => [...prev, ...result.base64Images]);
}

// Server action
async function processImages(formData: FormData) {
  const files = formData.getAll('images') as File[];
  const base64Images: string[] = [];

  for (const file of files) {
    const buffer = Buffer.from(await file.arrayBuffer());

    const processed = await sharp(buffer)
      .resize(800, null, { withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();

    const base64 = `data:image/webp;base64,${processed.toString('base64')}`;
    base64Images.push(base64);
  }

  return { base64Images };
}
```

### Display Settings (`/admin/settings`)

**Layout**:
```
Display Configuration
━━━━━━━━━━━━━━━━━━━━━

Card Display
  ☑ Show description on mango cards
  ☑ Show taste tags on cards
  ☐ Show season on cards
  ☐ Show origin on cards

Modal Display
  ☑ Show season in modal
  ☑ Show origin in modal
  ☑ Show taste tags in modal

Pricing
  ☑ Show original price (strikethrough)

[Save Settings]
```

**Implementation**:
- Toggle switches update `site_config` table
- Changes apply immediately (no page refresh needed)
- Frontend queries config and conditionally renders fields

---

## Data Migration Strategy

### Seed Script: `scripts/seed-mangoes.ts`

**Purpose**: One-time migration of existing hardcoded mango data to database

**Process**:
1. Read data from `src/app/lib/mangoes.ts`
2. For each mango:
   - Load image from static import
   - Fetch image buffer (if local file)
   - Process through Sharp pipeline
   - Convert to base64
   - Insert into `mangoes` table with pricing
3. Insert default config values into `site_config`
4. Create initial admin user (from env variables)

**Run Command**:
```bash
npm run db:seed-mangoes
```

**Script Implementation**:
```javascript
// scripts/seed-mangoes.ts
import { mangoes } from '../src/app/lib/mangoes';
import sharp from 'sharp';
import { db } from '../src/app/db';
import bcrypt from 'bcryptjs';

async function seedMangoes() {
  console.log('Seeding mangoes...');

  for (const mango of mangoes) {
    // Process images
    const base64Images: string[] = [];

    for (const imagePath of mango.images) {
      // Read image file from public/images
      const buffer = await fs.readFile(imagePath);

      const processed = await sharp(buffer)
        .resize(800, null, { withoutEnlargement: true })
        .webp({ quality: 80 })
        .toBuffer();

      const base64 = `data:image/webp;base64,${processed.toString('base64')}`;
      base64Images.push(base64);
    }

    // Insert mango
    await db.insert(mangoesTable).values({
      name: mango.name,
      slug: mango.slug,
      description: mango.description,
      longDescription: mango.longDescription,
      images: base64Images,
      season: mango.season,
      origin: mango.origin,
      taste: mango.taste,
      tags: mango.tags,
      featured: mango.featured || false,
      originalPrice: 50000,  // Example: ₹500
      discountedPrice: 40000  // Example: ₹400
    });

    console.log(`✓ Seeded ${mango.name}`);
  }

  // Seed default config
  const defaultConfig = [
    { key: 'show_season', value: 'false', type: 'boolean', description: 'Show season on cards/modal' },
    { key: 'show_origin', value: 'false', type: 'boolean', description: 'Show origin on cards/modal' },
    { key: 'show_taste', value: 'true', type: 'boolean', description: 'Show taste tags on cards/modal' },
    { key: 'show_description_on_card', value: 'true', type: 'boolean', description: 'Show description on mango cards' },
    { key: 'show_original_price', value: 'true', type: 'boolean', description: 'Show strikethrough original price' }
  ];

  for (const config of defaultConfig) {
    await db.insert(siteConfig).values(config);
  }

  // Create admin user
  const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10);
  await db.insert(adminUsers).values({
    username: process.env.ADMIN_USERNAME || 'admin',
    passwordHash
  });

  console.log('✓ Seed complete!');
}

seedMangoes();
```

**After Migration**:
- Delete or archive `src/app/lib/mangoes.ts`
- Update home page to fetch from database
- Update varieties page to fetch from database

---

## Error Handling

### Image Upload Errors

**File too large**:
```javascript
if (file.size > 10 * 1024 * 1024) {
  throw new Error('Image must be less than 10MB. Please compress before uploading.');
}
```

**Invalid format**:
```javascript
if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
  throw new Error('Only JPG, PNG, and WebP images are supported.');
}
```

**Sharp processing fails**:
```javascript
try {
  const processed = await sharp(buffer)...;
} catch (error) {
  throw new Error('Failed to process image. Please try a different file.');
}
```

### Database Errors

**Duplicate slug**:
```javascript
async function generateUniqueSlug(name: string) {
  let slug = slugify(name);
  let counter = 1;

  while (await db.query.mangoes.findFirst({ where: eq(mangoes.slug, slug) })) {
    slug = `${slugify(name)}-${counter}`;
    counter++;
  }

  return slug;
}
```

**Connection errors**:
- Retry with exponential backoff (3 attempts)
- Show user-friendly error message
- Log full error for debugging

**Query timeout**:
- Set reasonable timeout (10s for queries)
- Show error: "Request timed out. Please try again."

### Authentication Errors

**Invalid credentials**:
```javascript
// Delay response to prevent timing attacks
await new Promise(resolve => setTimeout(resolve, 1000));
throw new Error('Invalid username or password');
```

**Session expired**:
- Redirect to `/admin/login` with message
- Preserve attempted URL for redirect after login

**Rate limiting**:
```javascript
const loginAttempts = new Map<string, number>();

async function checkRateLimit(username: string) {
  const attempts = loginAttempts.get(username) || 0;

  if (attempts >= 5) {
    throw new Error('Too many login attempts. Please try again in 15 minutes.');
  }

  loginAttempts.set(username, attempts + 1);

  // Clear after 15 minutes
  setTimeout(() => loginAttempts.delete(username), 15 * 60 * 1000);
}
```

---

## Security Considerations

### Password Security
- Bcrypt with 10 rounds for hashing
- Passwords never logged or displayed
- Environment variables for initial admin credentials

### Session Security
- HttpOnly cookies prevent XSS access
- Secure flag in production (HTTPS only)
- SameSite=Lax prevents CSRF
- 7-day expiration
- Token: 32 random bytes (crypto.randomBytes)

### Input Validation
- Server-side validation for all inputs
- SQL injection prevented by Drizzle ORM parameterized queries
- XSS prevented by React automatic escaping
- File upload validation (type, size)

### Rate Limiting
- Login: Max 5 attempts per 15 minutes
- Image upload: Max 10 images per minute

### Environment Variables
```
DATABASE_URL=postgresql://...
ADMIN_USERNAME=admin
ADMIN_PASSWORD=secure_password_here
```

---

## Testing Strategy

### Unit Tests
- Image processing functions (Sharp)
- Slug generation uniqueness
- Price formatting (paise to rupees)

### Integration Tests
- Server actions (create/update/delete mango)
- Authentication flow
- Session management

### Manual Testing Checklist
- [ ] Login with correct credentials
- [ ] Login with wrong credentials (rate limit check)
- [ ] Add mango with images
- [ ] Edit mango (change name, price, images)
- [ ] Delete mango
- [ ] Toggle display settings
- [ ] View mango cards on home/varieties
- [ ] Click card to open modal
- [ ] Navigate carousel in modal
- [ ] Close modal (outside click, ESC key)
- [ ] Responsive design (mobile/desktop)
- [ ] Session expiry after 7 days

---

## Deployment Notes

### Vercel Configuration

**Environment Variables** (add in Vercel dashboard):
```
DATABASE_URL=postgresql://...
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password
```

**Build Settings**:
- Framework preset: Next.js
- Build command: `npm run build`
- Output directory: `.next`

**Database Migration**:
```bash
# After deploying
npm run db:push         # Push schema to production DB
npm run db:seed-mangoes # One-time seed
```

### Performance Considerations

**Base64 Image Size**:
- 15 mangoes × 3 images × 100KB = ~4.5MB total
- PostgreSQL handles this well
- Query times remain fast (<100ms)

**Serverless Function Limits**:
- Sharp processing time: ~200-500ms per image
- Vercel timeout: 10s (hobby), 60s (pro)
- Max 3-5 images per upload to stay within limits

---

## Future Enhancements (Out of Scope)

- Multi-language support (Hindi, Gujarati)
- Bulk import mangoes via CSV
- Image CDN migration (Cloudinary/S3)
- Order management system
- Customer reviews on mango pages
- Analytics dashboard (views, clicks)
- Email notifications for orders
- Multiple admin users with roles

---

## File Structure

```
mangomasti/
├── src/app/
│   ├── actions/
│   │   ├── mangoes.ts        # Mango CRUD server actions
│   │   ├── auth.ts           # Authentication actions
│   │   └── config.ts         # Config management actions
│   ├── admin/
│   │   ├── layout.tsx        # Admin layout (protected)
│   │   ├── page.tsx          # Admin dashboard
│   │   ├── login/
│   │   │   └── page.tsx      # Login page
│   │   ├── mangoes/
│   │   │   └── page.tsx      # Mango CRUD UI
│   │   └── settings/
│   │       └── page.tsx      # Display config UI
│   ├── components/
│   │   ├── Navbar.tsx        # Updated navbar (remove links)
│   │   ├── MangoCard.tsx     # Reusable mango card
│   │   └── MangoModal.tsx    # Image carousel modal
│   ├── db/
│   │   ├── index.ts          # Drizzle client
│   │   └── schema.ts         # Updated schema
│   ├── lib/
│   │   ├── images.ts         # (Keep for now, remove after migration)
│   │   └── utils.ts          # Helper functions
│   ├── page.tsx              # Home page (fetch from DB)
│   ├── varieties/
│   │   └── page.tsx          # Varieties page (fetch from DB)
│   └── middleware.ts         # Auth middleware
├── scripts/
│   ├── seed-mangoes.ts       # Migration script
│   └── create-admin.ts       # Create admin user
├── docs/
│   └── superpowers/
│       └── specs/
│           └── 2026-04-04-mango-admin-system-design.md
└── drizzle/
    └── schema.ts             # Drizzle schema definitions
```

---

## Summary

This design transforms MangoMasti from a static hardcoded site into a dynamic, admin-managed e-commerce platform. Key features:

1. **Database-first**: All mango data in PostgreSQL
2. **Admin control**: Full CRUD + display configuration
3. **Image optimization**: Sharp compression to ~100KB base64
4. **Secure auth**: Session-based with bcrypt passwords
5. **Clean UI**: Removed Gallery/Products, added mango modals
6. **Flexible config**: Toggle any field visibility without code changes
7. **Vercel-ready**: Serverless-compatible architecture

The system is designed to be maintainable, secure, and scalable for a small catalog (~15-50 mangoes). All technical decisions prioritize simplicity and compatibility with Vercel's platform constraints.
