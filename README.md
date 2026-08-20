# Pokémon Explorer

A modern, responsive Pokémon browser built on [PokéAPI](https://pokeapi.co).
Search, filter, sort, compare, and favorite your way through the Pokédex.

## Features

- **Card-based Pokémon grid** styled like a trading card: a type-colored
  foil frame, an HP plate, an artwork window, and a footer with the
  Pokédex number and type "energy" pills
- **Search by name**, debounced, with a clear empty/not-found state
- **Filter by type** (all 18 types, each with its own color and icon)
- **Sort** by Pokédex number, name, HP, attack, or speed
- **Load More** pagination. The grid never fetches more than the current
  page needs, and works identically whether you're browsing or searching
- **Detail view** (`/pokemon-name`) with large artwork, height/weight,
  abilities, animated base-stat bars, a moves list, a flavor-text blurb,
  and related Pokémon of the same type
- **Compare two Pokémon** (`/compare`) side-by-side, category by category,
  with the higher stat highlighted and a base-stat-total "leader" badge
- **Favorites.** Click the heart on any card or detail page to save it,
  persisted to `localStorage`, no account needed. View all your saved 
  Pokémon on the dedicated `/favorites` page.
- **Dark / light mode** with a smooth crossfade transition, remembered
  across visits
- **URL-synced state.** Search, type filter, sort, and both compare picks
  all live in the URL query string, so any view is shareable via link
- **Shared-element transition.** A card's artwork morphs into the detail
  page's hero image on navigation, and back again
- **Keyboard support.** `/` focuses search, `Escape` clears it or closes
  the open filter panel (returning focus to the button that opened it), a
  skip-to-content link is available as the very first Tab stop, and every
  interactive control is reachable and operable from the keyboard alone
- **Loading, error, and empty states** everywhere data is fetched:
  skeleton grids, a shared `ErrorState` component, and route-level error
  boundaries (`error.tsx`, `global-error.tsx`, `not-found.tsx`)

## Tech Stack

- **[Next.js](https://nextjs.org)** (App Router) + **React** + **TypeScript**
- **Tailwind CSS v4**, with a small set of CSS custom-property design
  tokens (`app/globals.css`) rather than hard-coded colors
- **[Framer Motion](https://www.framer.com/motion/)** (loaded via
  `LazyMotion`/`m`, not the full `motion` bundle) for card entrance and
  hover animation
- **[Lucide](https://lucide.dev)** for icons, including a type-to-icon
  mapping used throughout
- No backend, no database. Every byte of data comes from PokéAPI at
  request time or on the client

## API Used

[PokéAPI](https://pokeapi.co/api/v2/) (free, no API key required).

| Endpoint | Used for |
| --- | --- |
| `GET /pokemon?limit=&offset=` | Paginated browse feed, and the full name list used for instant client-side search |
| `GET /pokemon/{name\|id}` | Full detail for one Pokémon (card data, detail page, compare panels) |
| `GET /type/{type}` | Every Pokémon name belonging to a type, for the type filter |
| `GET /pokemon-species/{id}` | Flavor text and genus shown on the detail page |

All requests happen through `src/services/pokemonApi.ts`, the only file in
the app that calls `fetch`.

## Installation

```bash
git clone https://github.com/AKRISHNASRIKAR/Pokemon.git
cd Pokemon
npm install
```

Requires Node.js 18.18 or later.

## Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # ESLint
```

## Project Structure

```
src/
├── app/                  Routes (Next.js App Router)
│   ├── page.tsx          Home, fetches first page + full name list
│   ├── [name]/page.tsx   Detail view for one Pokémon
│   ├── compare/page.tsx  Side-by-side comparison
│   └── globals.css       Design tokens + hand-written CSS animation
│
├── components/
│   ├── pokemon/          Domain components (PokemonCard, TypeBadge, …)
│   ├── compare/          Everything specific to the Compare page
│   ├── ui/                Generic, Pokémon-agnostic components
│   └── layout/            Header, Footer, Hero, Container
│
├── services/pokemonApi.ts   Every PokéAPI call lives here
├── hooks/useFavorites.ts    localStorage-backed favorites store
├── lib/                     Formatting helpers, sort logic
├── types/pokemon.ts         Shapes for what the API returns
└── constants/pokemonTypes.ts  The 18 type names, typed
```

The rule that keeps this organized: a component goes in `components/ui/`
if it would make sense in a totally different app (a button, a skeleton, a
tilt wrapper); it goes in `components/pokemon/` if it only makes sense
here (a type badge, a stat bar). `PokemonCard` is defined once and
rendered both from the home grid and the detail page's "related Pokémon"
strip without either call site knowing about the other.

## Challenges Faced

- PokéAPI has no search endpoint, so search is faked on the client. I load
  the full ~1300-name list once on page load and filter it in memory,
  only fetching details for names that actually match.
- Scroll position kept getting lost when navigating back from a detail
  page. Next's built-in scroll restoration wasn't kicking in reliably, so
  I wrote a small manual version instead: save scroll position as you
  scroll, restore it on `popstate`.
- The animated card-to-detail-page transition kept breaking that same
  scroll restoration, whichever one finished first would stomp on the
  other. Fixed by making restoration fully manual so it no longer cares
  when the transition finishes.
- The favorite button couldn't just be a `<button>` inside the card's
  `<a>` without breaking keyboard navigation (nested interactive elements
  are invalid HTML). Made it a sibling element instead, positioned to
  look like part of the card.
- The Compare page's search dropdown used to close on blur, which meant
  tabbing into a suggestion made it disappear before you could pick it.
  Switched it to close on click-outside or Escape instead.

## Future Improvements

- Infinite scroll as an alternative to "Load More"
- Evolution chain data on the detail page
- Move details (type, power, accuracy) instead of just names
- Offline/PWA support so a previously visited Pokémon works without a
  network round trip
