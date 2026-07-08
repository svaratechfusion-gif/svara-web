# Information Architecture

**Business:** Every page has a purpose. No page serves two audiences.
**User:** Navigate intuitively. Always know where they are.
**Owner:** OpenCode
**Acceptance:** A user can reach any page in two clicks.

---

## Primary Navigation

| Label | Path | Type |
|-------|------|------|
| Experience | `/` | Cinematic homepage |
| Platform | `/platform` | Product page |
| Products | `/products` | Product overview |
| Industries | `/industries` | Industry overview |
| Technology | `/technology` | Product page |
| Knowledge | `/knowledge` | Resource hub |
| Investors | `/investors` | Business page |
| Company | `/company` | Business page |
| Contact | `/contact` | Utility |

## URL Hierarchy

```
/
├── platform
├── products/[slug]
├── industries/[slug]
├── technology
├── knowledge/faq
├── knowledge/glossary
├── investors
├── company
├── contact
└── legal/privacy
└── legal/terms
```

## Routing Rules

- All routes are static (no dynamic params beyond `[slug]`)
- 404 redirects to `/`
- Product pages: `/products/[slug]`
- Industry pages: `/industries/[slug]`
