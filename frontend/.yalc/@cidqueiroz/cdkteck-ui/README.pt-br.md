<div align="center">

# 🎨 CDK TECK UI Kit
### A Base de Componentes Compartilhada para o Ecossistema CDK TECK

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![NPM](https://img.shields.io/npm/v/@cidqueiroz/cdkteck-ui?label=Version&style=for-the-badge&logo=npm)
![CI/CD](https://img.shields.io/badge/CI/CD-GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

</div>

---

## 🏛️ Papel Arquitetural & Visão

`@cidqueiroz/cdkteck-ui` é a biblioteca de componentes compartilhada que serve como alicerce para todo o ecossistema de aplicações **CDK TECK**. Seu principal propósito arquitetural é impor **Consistência de Design**, **Acelerar o Desenvolvimento** e **Reduzir a Duplicação de Código** entre múltiplos projetos independentes.

Ao centralizar elementos de UI—desde átomos básicos como botões e inputs até moléculas complexas como cabeçalhos e tabelas de dados—esta biblioteca atua como uma "Fonte Única da Verdade" (Single Source of Truth) para a experiência do usuário. Essa abordagem garante que cada aplicação, independentemente de sua função específica, pareça parte integrante de uma suíte de produtos unificada e profissional.

Este projeto não é apenas uma coleção de componentes; é um ativo estratégico para garantir a coerência da marca e a eficiência da engenharia.

---

## 📜 Princípios Orientadores

- **Consistência:** Cada componente oferece uma aparência, comportamento e experiência uniformes em todas as aplicações.
- **Reutilização:** Construído para ser genérico e configurável, evitando lógica específica de cada projeto.
- **Manutenibilidade:** Um único local para corrigir um bug de UI ou aplicar uma atualização de design, que é então propagada para todos os projetos consumidores através da atualização da versão.
- **Experiência do Desenvolvedor (DX):** Os componentes são fortemente tipados com TypeScript e documentados para proporcionar um fluxo de desenvolvimento suave e previsível.

---

## 📦 Instalação & Configuração

Como este é um pacote privado hospedado no **GitHub Packages**, você precisa configurar seu projeto para se autenticar.

### 1. Configure o `.npmrc`

Crie um arquivo `.npmrc` na raiz do seu projeto com o seguinte conteúdo:

```
@cidqueiroz:registry=https://npm.pkg.github.com
```

### 2. Forneça o Token de Autenticação

Você precisará de um **Personal Access Token (PAT)** do GitHub com o escopo `read:packages`. Exporte este token como uma variável de ambiente antes de instalar:

```bash
export NODE_AUTH_TOKEN="SEU_PAT_DO_GITHUB_AQUI"
```

### 3. Instale o Pacote

Com o ambiente configurado, instale o pacote usando o npm:

```bash
npm install @cidqueiroz/cdkteck-ui
```

---

## 🚀 Como Usar

Importe os componentes diretamente do pacote em sua aplicação React.

```jsx
import React from 'react';
// Exemplo hipotético de um componente PageHeader
import { PageHeader } from '@cidqueiroz/cdkteck-ui';

function MinhaPagina() {
  return (
    <div>
      <PageHeader
        title="Minha Aplicação"
        subtitle="Utilizando o CDK TECK UI Kit"
      />
      {/* ... conteúdo da sua página ... */}
    </div>
  );
}

export default MinhaPagina;
```
*(Nota: Este README deve ser atualizado com exemplos de componentes reais à medida que forem desenvolvidos.)*

---

## 🤖 CI/CD & Versionamento Automatizado

Este repositório está equipado com um pipeline de CI/CD sofisticado usando **GitHub Actions** e **Semantic Release**.

1.  **Convenção de Commits:** Todos os commits na branch `main` devem seguir a especificação [Conventional Commits](https://www.conventionalcommits.org/).
2.  **Release Automatizado:** A cada push na `main`, um workflow é acionado:
    - O `semantic-release` analisa os commits para determinar se uma atualização de versão `patch`, `minor` ou `major` é necessária.
    - Ele atualiza automaticamente a versão no `package.json` e o arquivo `CHANGELOG.md`.
    - Commita essas mudanças e cria uma nova Git Tag.
    - Por fim, constrói o projeto e **publica a nova versão** no GitHub Packages.

Este processo garante que o versionamento seja determinístico, automatizado e perfeitamente integrado ao fluxo de trabalho de desenvolvimento.
