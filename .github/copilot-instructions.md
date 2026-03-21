# Musical-Fabrik React App - Copilot-Anweisungen

## Projektübersicht
Dies ist eine React-Anwendung für die Musical-Fabrik, die mit Vite, TypeScript und verschiedenen wichtigen Bibliotheken erstellt wurde. Die App verwendet:
- Vite als Build-Tool
- TypeScript für statische Typisierung
- React mit funktionalen Komponenten und Hooks
- TanStack Router für das Routing
- MUI (Material-UI) für UI-Komponenten
- Zustand für State Management
- i18n für Internationalisierung
- Capacitor für mobile App-Builds (iOS/Android)

## Schlüsselkonzepte

### Architektur
- `src/` enthält den Hauptquellcode
- `src/api/` behandelt API-Kommunikation mit axios
- `src/components/` enthält wiederverwendbare UI-Komponenten
- `src/store/` enthält Zustand-Stores für globales State Management
- `src/models/` definiert TypeScript-Interfaces und -Types
- `src/routes/` enthält TanStack Router Definitionen
- `src/pages/` enthält seitenspezifische Komponenten
- `src/utils/` enthält Hilfsfunktionen und -komponenten

### State Management
- Verwendet Zustand für globales State Management
- Store-Slices in `src/store/` sind nach Funktionalität aufgeteilt (auth, pages, settings etc.)
- Selektoren werden für den Zugriff auf Store-Daten verwendet (`select*` Funktionen)

### Komponentenstruktur
- Verwende funktionale Komponenten mit TypeScript Props-Interfaces
- Content Blocks (`src/components/contentBlocks/`) für modulare Seiteninhalte
- Sections (`src/components/sections/`) für größere Seitenabschnitte
- Wiederverwendbare UI-Komponenten in `src/components/`

### Styling
- Material-UI (MUI) für Basis-Komponenten
- Styles werden in `.styles.ts` Dateien neben den Komponenten definiert
- Globale Styles in `src/styles/global/`
- CSS-Variablen für projektspezifische Anpassungen

### Routing & Navigation
- TanStack Router für typsicheres Routing
- Route-Definitionen in `src/routes/`
- Generierte Route-Typen in `routeTree.gen.ts`

## Best Practices

### Neue Komponenten
1. Erstelle einen neuen Ordner unter `src/components/`
2. Definiere ein Props-Interface mit TypeScript
3. Erstelle separate `.styles.ts` Datei für MUI-Styles
4. Verwende funktionale Komponenten mit expliziten Typen

### State Management
1. Definiere neue Slices in `src/store/`
2. Erstelle typisierte Selektoren für den Zugriff
3. Nutze `useGlobalStore` Hook mit Selektoren

### API-Integration
1. Neue API-Endpunkte in `src/api/axios/`
2. Verwende axios-Instanz für Requests
3. Definiere Response-Types in `src/models/`

### Internationalisierung
- Verwende `useTranslation` Hook für Übersetzungen
- Translations-Keys in `public/i18n/`

### Mobile App Build
- Android: `npx cap sync android && npx cap open android`
- iOS: `npx cap sync ios && npx cap open ios`