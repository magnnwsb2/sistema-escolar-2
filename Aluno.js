export class Aluno {
  #nome; #matricula; #nota1; #nota2; #nota3;
  constructor(nome, matricula, nota1, nota2, nota3) {
    this.#nome = String(nome).trim();
    this.#matricula = String(matricula).trim();
    this.setNota1(nota1); this.setNota2(nota2); this.setNota3(nota3);
  }
  getNome() { return this.#nome; }
  getMatricula() { return this.#matricula; }
  getNota1() { return this.#nota1; }
  getNota2() { return this.#nota2; }
  getNota3() { return this.#nota3; }
  static validarNota(nota) {
    const numero = Number(nota);
    if (String(nota).trim() === '' || !Number.isFinite(numero) || numero < 0 || numero > 10) {
      throw new Error('A nota deve estar entre 0 e 10.');
    }
    return numero;
  }
  setNota1(nota) { this.#nota1 = Aluno.validarNota(nota); }
  setNota2(nota) { this.#nota2 = Aluno.validarNota(nota); }
  setNota3(nota) { this.#nota3 = Aluno.validarNota(nota); }
  gerarMedia() { return (this.#nota1 + this.#nota2 + this.#nota3) / 3; }
  gerarEstado() {
    const media = this.gerarMedia();
    return media >= 6 ? 'Aprovado' : media >= 3 ? 'Recuperação' : 'Reprovado';
  }
  toJSON() {
    return { nome: this.#nome, matricula: this.#matricula,
      nota1: this.#nota1, nota2: this.#nota2, nota3: this.#nota3 };
  }
}
