// SINGLE SOURCE OF TRUTH for the site's primary navigation.
//
// Consumed by BOTH the Global Menu (app/components/navigation/GlobalNavigation.vue)
// and the footer "Explore" column (app/components/footer/Footer.vue). Add,
// remove, or reorder a page HERE and both surfaces update automatically — never
// duplicate this list in a component.
export interface NavItem {
  label: string
  to: string
}

export const primaryNav: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Ecosystem', to: '/ecosystem' },
  { label: 'Products', to: '/products' },
  { label: 'Divisions', to: '/divisions' },
  { label: 'Technology', to: '/technology' },
  { label: 'Architecture', to: '/architecture' },
  { label: 'Industries', to: '/industries' },
  { label: 'About', to: '/about' },
  { label: 'Investors', to: '/investors' },
  { label: 'Careers', to: '/careers' },
  { label: 'Blogs', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]
