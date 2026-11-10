# Sistema Escolar 2

Aplicação didática de cadastro de turmas, alunos e edição de notas.

## Funcionalidades
- Cadastro de turmas (professor e curso)
- Cadastro de alunos somente após selecionar uma turma
- Três notas privadas por aluno, com getters e setters
- Média e situação (Aprovado >= 6; Recuperação >= 3; Reprovado < 3)
- Edição de uma nota por vez, quantas vezes for necessário
- Persistência local no navegador com localStorage
- Restauração da aba selecionada e tabela responsiva

## Executar
```bash
npm install
npm run dev
```
Para gerar a versão de publicação: `npm run build`.
Para testar as regras do aluno: `npm test`.

## Observações
Os dados são salvos somente no navegador atual. Limpar os dados do site apaga os registros.
Esta versão usa Vite e módulos ES para que os scripts sejam incluídos no build de produção.
O código não possui recarregamento automático; caso a página recarregue periodicamente, investigar hospedagem e navegador.
