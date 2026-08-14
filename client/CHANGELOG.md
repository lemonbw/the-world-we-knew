# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),  
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
> Changes planned for the next release.

---

## [0.9.0] - 2026-04-12

### Added
- Interactive "FalseNavLink" navigation with destructible states and visual feedback

### Changed
- Replaced standard navigation links with interactive variants in header
- Adjusted background layout scaling and positioning for decorative elements (eyes and chains)
- Refined responsive spacing in background layers for better visual balance across breakpoints
- Removed redundant background styling from sort button for cleaner UI consistency
- Added background styling to FontSelector and FontSizeSelector controls for improved visual coherence

## [0.8.0] - 2026-04-12

### Changed
- Toolbar expanded in fullscreen mode
- Chapter selector and font selector UI refinements
- Background system refactored (eyes/chains layering improvements)
- Panel state extracted into reusable hook
- Header navigation refactored into modular components

### Fixed
- Reading page scroll behavior
- Font selector hover issues on mobile
- Chapter selector layout and menu overflow
- Fullscreen interaction edge cases


## [0.7.0] - 2026-03-27 → 2026-04-11

### Added
- Theme-based UI system improvements (light/dark adaptation)
- BookCard visual enhancements (chains, eyes, layering)
- Mobile adaptation for core UI components
- Hamburger menu animation system

### Changed
- Global border system standardized (2px rule)
- UI components now consistently follow theme rules
- Toolbar layout and scrolling behavior redesigned

### Fixed
- Toolbar scroll issues
- Header visual inconsistencies
- Background layering glitches


## [0.6.0] - 2026-03-11 → 2026-03-22

### Added
- Responsive layout system (mobile-first adaptation)
- Reading page responsive redesign
- ChapterList mobile behavior improvements
- Adaptive font sizing system

### Changed
- Toolbar extracted into separate module
- Project architecture refactored to feature-based structure
- Header split into navigation / hamburger / state hook


## [0.5.0] - 2026-03-01 → 2026-03-09

### Added
- Reading instruments panel
- Overview panel enhancements
- Footer component
- Fullscreen reading mode improvements

### Changed
- Reading page architecture refactored
- Markdown rendering system upgraded
- Panel UI redesigned and repositioned

### Fixed
- Fullscreen scrolling issues
- Layout shifting in reading mode


## [0.4.0] - 2026-02-24 → 2026-02-28

### Added
- ChapterSelector component with search and autoscroll
- Font system (selector, size control, search)
- Align selector for reading layout
- Chapter pagination system

### Changed
- Reading page structure improved
- Fonts system modularized into hooks and components
- Chapter system refactored into feature modules

### Fixed
- Chapter selector overflow issues
- Font size input edge cases
- Reading layout alignment issues


## [0.3.0] - 2026-02-15 → 2026-02-23

### Added
- Full reading page implementation
- Markdown rendering system (markdown-it + plugins)
- Fullscreen mode toggle (keyboard + button)
- Search system (Fuse.js integration)
- Chapter routing via slug-based system

### Changed
- Pages structure migrated into app directory
- Absolute imports introduced
- Content moved to meta-based system

### Fixed
- Chapter navigation edge cases
- Font rendering issues
- Reading layout inconsistencies


## [0.2.0] - 2026-02-08 → 2026-02-14

### Added
- ChapterList pagination system
- ChapterSearch with debounce and optimizations
- Chapter sorting system
- ChapterListToggle navigation component

### Changed
- ChapterList performance optimizations
- Animation system improved (fade + slide)
- Search logic optimized for long lists

### Fixed
- Sorting animation glitches
- Hover state inconsistencies
- Pagination edge cases


## [0.1.0] - 2026-01-06 → 2026-02-07

### Added
- Initial Next.js project setup
- Header navigation system
- BookCard component with rating system
- ChapterList base implementation
- Footer and basic layout structure

### Changed
- Header refactored from buttons to links
- Component naming standardized (PascalCase)
- Project structure improved progressively

### Fixed
- Rating hover logic
- Initial layout rendering issues
- Navigation routing bugs
