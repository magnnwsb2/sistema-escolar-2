export class Turma {
  constructor(professor, curso) {
    this.professor = String(professor).trim();
    this.curso = String(curso).trim();
    this.alunos = [];
  }
  adicionarAluno(aluno) { this.alunos.push(aluno); }
}
