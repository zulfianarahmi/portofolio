# Untitled UI Components

Komponen-komponen ini dibuat berdasarkan design system Untitled UI (free version).

## Komponen yang Tersedia

### Base Components
- **Button** - Tombol dengan berbagai variant (primary, secondary, tertiary, ghost)
- **Badge** - Badge untuk menampilkan label/tag dengan berbagai variant
- **Card** - Card component dengan CardHeader, CardTitle, CardDescription, dan CardContent

### Application UI Components
- **PageHeader** - Header untuk halaman dengan title dan description
- **SectionHeader** - Header untuk section dengan title dan description
- **Navigation** - Navigation bar dengan theme toggle

## Penggunaan

```tsx
import { Button, Badge, Card, CardHeader, CardTitle, CardContent } from '@/components/ui';

// Button
<Button variant="primary" size="md">Click me</Button>

// Badge
<Badge variant="secondary">Next.js</Badge>

// Card
<Card hover>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
</Card>
```

## Design System

Semua komponen mengikuti design system Untitled UI dengan:
- Dark mode support
- Responsive design
- Accessible components
- Modern styling dengan Tailwind CSS

