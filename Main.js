import { Aluno } from './Aluno.js';
import { Turma } from './Turma.js';
import { Interface } from './Interface.js';

const CHAVE = 'sistema-escolar-2-dados';
let turmas = [];
let alunos = [];
let indiceEdicao = null;
const campo = id => document.getElementById(id);

function salvarDados() {
  localStorage.setItem(CHAVE, JSON.stringify({
    turmas: turmas.map(t => ({
      professor: t.professor, curso: t.curso,
      matriculas: t.alunos.map(a => a.getMatricula())
    })),
    alunos: alunos.map(a => a.toJSON())
  }));
}
function carregarDados() {
  try {
    const dados = JSON.parse(localStorage.getItem(CHAVE));
    if (!dados) return;
    alunos = (dados.alunos || []).map(a =>
      new Aluno(a.nome, a.matricula, a.nota1, a.nota2, a.nota3));
    turmas = (dados.turmas || []).map(t => {
      const nova = new Turma(t.professor, t.curso);
      nova.alunos = (t.matriculas || []).map(m =>
        alunos.find(a => a.getMatricula() === m)).filter(Boolean);
      return nova;
    });
  } catch (erro) {
    console.error('Erro ao recuperar dados:', erro);
    Interface.mensagem('Não foi possível recuperar os dados salvos.', true);
  }
}
function atualizarTurmas() {
  const select = campo('turma-aluno');
  const selecionada = select.value;
  select.replaceChildren(new Option('Selecione uma turma', ''));
  turmas.forEach((t, i) => select.add(new Option(t.curso + ' - ' + t.professor, String(i))));
  if ([...select.options].some(o => o.value === selecionada)) select.value = selecionada;
}
function listarAluno() {
  Interface.listar(alunos, editarNotas);
}
function btnSalvarTurma() {
  const professor = campo('professor').value.trim();
  const curso = campo('curso').value.trim();
  if (!professor || !curso) return Interface.mensagem('Informe o professor e o curso.', true);
  turmas.push(new Turma(professor, curso));
  salvarDados();
  atualizarTurmas();
  campo('turma-aluno').value = String(turmas.length - 1);
  campo('professor').value = '';
  campo('curso').value = '';
  Interface.mensagem('Turma cadastrada com sucesso.');
}
function btnSalvar() {
  const indice = campo('turma-aluno').value;
  if (indice === '' || !turmas[Number(indice)])
    return Interface.mensagem('Cadastre e selecione uma turma primeiro.', true);
  const nome = campo('nome').value.trim();
  const matricula = campo('matricula').value.trim();
  if (!nome || !matricula) return Interface.mensagem('Informe nome e matrícula.', true);
  if (alunos.some(a => a.getMatricula() === matricula))
    return Interface.mensagem('Esta matrícula já está cadastrada.', true);
  try {
    const aluno = new Aluno(nome, matricula, campo('n1').value, campo('n2').value, campo('n3').value);
    alunos.push(aluno);
    turmas[Number(indice)].adicionarAluno(aluno);
    salvarDados();
    ['nome', 'matricula', 'n1', 'n2', 'n3'].forEach(id => campo(id).value = '');
    Interface.mensagem('Aluno cadastrado com sucesso.');
  } catch (erro) { Interface.mensagem(erro.message, true); }
}
function editarNotas(indice) {
  indiceEdicao = indice;
  const aluno = alunos[indice];
  campo('aluno-edicao').textContent = 'Aluno: ' + aluno.getNome();
  campo('nota-edicao').value = '1';
  atualizarNotaEdicao();
  campo('editor-notas').hidden = false;
}
function atualizarNotaEdicao() {
  if (indiceEdicao === null) return;
  const aluno = alunos[indiceEdicao];
  const numero = campo('nota-edicao').value;
  campo('valor-edicao').value = numero === '1' ? aluno.getNota1()
    : numero === '2' ? aluno.getNota2() : aluno.getNota3();
}
function salvarNota() {
  if (indiceEdicao === null) return;
  const aluno = alunos[indiceEdicao];
  const numero = campo('nota-edicao').value;
  try {
    const valor = Aluno.validarNota(campo('valor-edicao').value);
    if (numero === '1') aluno.setNota1(valor);
    else if (numero === '2') aluno.setNota2(valor);
    else aluno.setNota3(valor);
    salvarDados();
    listarAluno();
    Interface.mensagem('Nota atualizada com sucesso.');
    atualizarNotaEdicao();
  } catch (erro) { Interface.mensagem(erro.message, true); }
}
function cancelarEdicao() {
  indiceEdicao = null;
  campo('editor-notas').hidden = true;
}
document.addEventListener('DOMContentLoaded', () => {
  carregarDados();
  atualizarTurmas();
  const aba = localStorage.getItem('sistema-escolar-2-aba') || 'cadastrar';
  Interface.mostrarAba(aba === 'listar' ? 'listar' : 'cadastrar');
  listarAluno();
  document.querySelectorAll('[data-aba]').forEach(botao =>
    botao.addEventListener('click', () => Interface.mostrarAba(botao.dataset.aba)));
  campo('salvar-turma').addEventListener('click', btnSalvarTurma);
  campo('salvar-aluno').addEventListener('click', btnSalvar);
  campo('nota-edicao').addEventListener('change', atualizarNotaEdicao);
  campo('salvar-nota').addEventListener('click', salvarNota);
  campo('cancelar-edicao').addEventListener('click', cancelarEdicao);
});
