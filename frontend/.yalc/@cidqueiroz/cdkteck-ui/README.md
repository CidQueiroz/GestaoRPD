<div align="center">

# 🎨 CDK TECK UI Kit
### The Shared Component Foundation for the CDK TECK Ecosystem

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![NPM](https://img.shields.io/npm/v/@cidqueiroz/cdkteck-ui?label=Version&style=for-the-badge&logo=npm)
![CI/CD](https://img.shields.io/badge/CI/CD-GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

</div>

---

## 🏛️ Architectural Role & Vision

`@cidqueiroz/cdkteck-ui` is the shared component library that underpins the entire **CDK TECK** application ecosystem. Its primary architectural purpose is to enforce **Design Consistency**, **Accelerate Development**, and **Reduce Code Duplication** across multiple independent projects.

By centralizing UI elements—from basic atoms like buttons and inputs to complex molecules like headers and data tables—this library acts as a "Single Source of Truth" for the user experience. This approach ensures that every application, regardless of its specific function, feels like an integral part of a unified, professional product suite.

This project is not just a collection of components; it is a strategic asset for ensuring brand coherence and engineering efficiency.

---

##  guiding principles

- **Consistency:** Every component provides a uniform look, feel, and behavior across all applications.
- **Reusability:** Built to be generic and configurable, avoiding project-specific logic.
- **Maintainability:** A single place to fix a UI bug or apply a design update, which then propagates to all consuming projects upon version upgrade.
- **Developer Experience:** Components are strongly typed with TypeScript and documented to provide a smooth and predictable development workflow.

---

## 📦 Installation & Setup

As this is a private package hosted on **GitHub Packages**, you must configure your project to authenticate.

### 1. Configure `.npmrc`

Create a `.npmrc` file in your project's root directory with the following content:

```
@cidqueiroz:registry=https://npm.pkg.github.com
```

### 2. Provide Authentication Token

You will need a GitHub **Personal Access Token (PAT)** with the `read:packages` scope. Export this token as an environment variable before installing:

```bash
export NODE_AUTH_TOKEN="YOUR_GITHUB_PAT_HERE"
```

### 3. Install the Package

Once the environment is configured, install the package using npm:

```bash
npm install @cidqueiroz/cdkteck-ui
```

---

## 🚀 Usage

Import components directly from the package into your React application.

```jsx
import React from 'react';
// Hypothetical example of a PageHeader component
import { PageHeader } from '@cidqueiroz/cdkteck-ui';

function MyAppPage() {
  return (
    <div>
      <PageHeader
        title="My Application"
        subtitle="Powered by the CDK TECK UI Kit"
      />
      {/* ... your page content ... */}
    </div>
  );
}

export default MyAppPage;
```
*(Note: This README should be updated with real component examples as they are developed.)*

---

## 🤖 CI/CD & Automated Versioning

This repository is equipped with a sophisticated CI/CD pipeline using **GitHub Actions** and **Semantic Release**.

1.  **Commit Convention:** All commits to the `main` branch must follow the [Conventional Commits specification](https://www.conventionalcommits.org/).
2.  **Automated Release:** On every push to `main`, a workflow is triggered:
    - `semantic-release` analyzes the commits to determine if a `patch`, `minor`, or `major` version bump is needed.
    - It automatically updates the `package.json` version and `CHANGELOG.md`.
    - It commits these changes and creates a new Git tag.
    - Finally, it builds the project and **publishes the new version** to GitHub Packages.

This process ensures that versioning is deterministic, automated, and seamlessly integrated with the development workflow.