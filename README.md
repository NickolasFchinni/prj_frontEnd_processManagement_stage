# 📌 Case - Mapeamento de Processos Empresariais

## 🏢 Sobre o Projeto
Este projeto visa mapear os processos e subprocessos de uma empresa, organizados por área, proporcionando uma visão clara e estruturada dos fluxos internos. Com esta ferramenta, é possível cadastrar áreas, processos e subprocessos, além de associar informações como sistemas utilizados, responsáveis e documentação relevante.

O projeto foi desenvolvido utilizando **React** e **TypeScript** para maior segurança e manutenibilidade do código.

Este projeto necessita de uma API, para baixar acesse "https://github.com/NickolasFchinni/prj_processManagement_stage".

---

## 🚀 Tecnologias Utilizadas
- **Frontend:** React.js + TypeScript
- **Banco de Dados:** MongoDB 
- **Estilização:** Tailwind CSS

---

## ⚙️ Funcionalidades
### 🔹 Cadastro e Gestão
✅ **Cadastro de Áreas**: Organize os processos por setor da empresa.  
✅ **Gestão de Processos e Subprocessos**: Adicione, edite ou remova processos e seus respectivos subprocessos.  
✅ **Hierarquia Ilimitada**: Subprocessos podem conter outros subprocessos, formando uma estrutura em árvore.  
✅ **Detalhamento dos Processos**:
   - Ferramentas e sistemas utilizados
   - Pessoas responsáveis
   - Documentação associada
✅ **Visualização Interativa da Cadeia de Processos**:
   - Cores destacando status e importância
   - Fluxogramas ou gráficos para navegação intuitiva

---

## 📦 Instalação e Execução
### 1️⃣ Pré-requisitos
Certifique-se de ter instalado:
- **Node.js** (versão 14 ou superior)
- **Git**

### 2️⃣ Clonar o repositório
```bash
git clone https://github.com/NickolasFchinni/prj_frontEnd_processManagement_stage.git
cd prj_frontEnd_processManagement_stage
```

### 3️⃣ Instalar dependências
```bash
npm install
```
Crie um arquivo `.env` e adicione:
```
VITE_API_BASE_URL=http://localhost:5000
```
Inicie o frontend:
```bash
npm run dev
```
A aplicação estará disponível em **http://localhost:5173**.

---

## 📊 Exemplo de Estrutura de Processos
### Área: Recursos Humanos
#### Processo: Recrutamento e Seleção
- **Subprocessos:** Definição de perfil da vaga, Divulgação da vaga, Triagem de currículos, Entrevistas, Oferta de contratação.
- **Ferramentas Utilizadas:** Trello, Notion.
- **Responsáveis:** Equipe de Recrutamento.
- **Documentação:** Fluxo de recrutamento, guias de entrevista.

#### Processo: Avaliação de Performance
- **Subprocessos:** Definição de critérios, Aplicação de avaliações, Feedbacks.
- **Ferramentas Utilizadas:** Notion, Planilhas.
- **Responsáveis:** Equipe de RH e gestores.
- **Documentação:** Modelo de avaliação, relatórios de feedback.

---

## 📜 Licença
Este projeto é de uso acadêmico e não deve ser utilizado para fins comerciais sem autorização.

📩 **Contato:** Caso tenha dúvidas ou sugestões, entre em contato através do GitHub!

