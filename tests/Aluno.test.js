import test from 'node:test';
import assert from 'node:assert/strict';
import { Aluno } from '../Aluno.js';
test('média e aprovação', () => {
  const a = new Aluno('Ana', '1', 6, 7, 8);
  assert.equal(a.gerarMedia(), 7);
  assert.equal(a.gerarEstado(), 'Aprovado');
});
test('recuperação e reprovação', () => {
  assert.equal(new Aluno('A', '1', 3, 3, 3).gerarEstado(), 'Recuperação');
  assert.equal(new Aluno('B', '2', 2, 2, 2).gerarEstado(), 'Reprovado');
});
test('alterar nota recalcula média', () => {
  const a = new Aluno('Ana', '1', 5, 5, 5);
  a.setNota1(8);
  assert.equal(a.gerarMedia(), 6);
  assert.equal(a.gerarEstado(), 'Aprovado');
});
test('nota inválida é rejeitada', () => {
  assert.throws(() => new Aluno('Ana', '1', 11, 5, 5));
  assert.throws(() => new Aluno('Ana', '1', '', 5, 5));
});
