# Contributing to CampusChronicle

Thank you for your interest in contributing to **CampusChronicle**! This repository is dedicated to preserving departmental memories, showcasing technical milestones, and providing an accessible digital showcase for students and faculty.

---

## 1. Code of Conduct

We are committed to providing a welcoming, inclusive, and professional environment for all contributors. Please ensure that all interactions and code contributions remain respectful, collaborative, and constructive.

---

## 2. Development Setup

1. **Fork & Clone:**
   ```bash
   git clone https://github.com/poshiyaharsh/campuschronicle.git
   cd campuschronicle
   ```
2. **Install Dependencies:**
   ```bash
   npm install
   ```
3. **Environment Setup:**
   ```bash
   cp .env.example .env.local
   ```
4. **Run Local Server:**
   ```bash
   npm run dev
   ```

---

## 3. Pull Request Guidelines

Before opening a pull request, ensure the following quality checks pass locally:

- **Linting:** `npm run lint` must pass with 0 errors or warnings.
- **TypeScript:** `npm run typecheck` must pass without compilation errors.
- **Unit Tests:** `npm run test` must pass all test suites.
- **Build Verification:** `npm run build` must generate all static and SSG pages successfully.

### Conventional Commits
Please structure your commit messages using the [Conventional Commits](https://www.conventionalcommits.org/) convention:
- `feat: add new search filter by coordinator`
- `fix: resolve mobile drawer focus trap`
- `docs: update deployment instructions`
- `test: add unit test for video stream parsing`

---

## 4. Branch Hygiene

- Create feature branches branching from `main`: `feature/your-feature-name` or `fix/issue-description`.
- Keep pull requests focused on a single change or feature.
- Never commit `.env` secret files, personal credentials, or internal phase logs.

---

## 5. Security & Reporting Vulnerabilities

If you discover a security vulnerability or sensitive key exposure, please **do not** open a public issue. Contact the repository maintainers privately via GitHub or official departmental email.
