# Zenban 🚀

**A high-performance, enterprise-grade Kanban board engineered for scale.**

[Live Demo](https://zenbann.netlify.app/) | [Report Bug](https://github.com/joshir16/Zenban/issues)

![Zenban Preview](https://placehold.co/600x400?text=Zenban+High+Performance+Preview)

## 📖 About The Project

Zenban is a Trello-style task management application built to test the limits of modern React performance. Unlike standard dashboard clones that slow down with data, Zenban is architected to handle **1,000+ active tasks** without UI blocking or frame drops.

It leverages advanced **Virtualization**, **Refs**, and **Memoization** strategies to ensure a consistent 60 FPS experience, regardless of dataset size.

---

## ⚡ Key Engineering Wins

### 1. Virtualized Rendering Engine

Standard React lists crash the DOM when rendering large datasets. I implemented **Windowing (Virtualization)** strategies for both vertical navigation and horizontal Kanban columns.

- [cite_start]**Impact:** Reduced initial load time by **86%** (263ms → 37ms) for 1,000+ item datasets[cite: 26].
- **Tech:** `react-virtuoso`, Grid Layouts.

### 2. 60 FPS Drag-and-Drop

To prevent layout thrashing during drag operations, I bypassed the main React render cycle.

- [cite_start]**Strategy:** Utilized **Uncontrolled Refs** to track coordinate deltas, separating high-frequency animation state from the Redux store[cite: 25].
- **Result:** Zero-latency interactivity even on lower-end devices.

### 3. O(1) State Derivation

Filtering a list of thousands of items can freeze the main thread.

- [cite_start]**Strategy:** Architected **Memoized Selectors (Reselect)** to compute derived state (Search + Tags + Priority)[cite: 24].
- **Result:** Filtering is instantaneous and never triggers unnecessary component re-renders.

### 4. Optimized Forms & Persistence

- **Forms:** Eliminated input lag in complex data entry forms by leveraging **uncontrolled inputs** and optimistic state updates.
- [cite_start]**Persistence:** Engineered a robust Redux middleware to synchronize application state with `localStorage`, ensuring seamless data recovery and session continuity[cite: 27].

---

## 🛠 Tech Stack

- **Core:** [React 18](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (Dark Mode First)
- **Performance:** React Profiler, React Virtuoso
- **Routing:** React Router v6

---
