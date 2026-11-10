export class Interface {
  static mensagem(texto, erro = false) {
    const elemento = document.getElementById('mensagem');
    elemento.textContent = texto;
    elemento.className = erro ? 'mensagem erro' : 'mensagem';
  }
  static mostrarAba(nome) {
    document.querySelectorAll('.tab-button').forEach(botao => {
      botao.classList.toggle('active', botao.dataset.aba === nome);
    });
    document.querySelectorAll('.tab-content').forEach(aba => {
      aba.classList.toggle('active', aba.id === 'tab-' + nome);
    });
    localStorage.setItem('sistema-escolar-2-aba', nome);
  }
  static listar(alunos, aoEditar) {
    const destino = document.getElementById('alunos');
    destino.replaceChildren();
    if (!alunos.length) {
      const aviso = document.createElement('p');
      aviso.textContent = 'Nenhum aluno cadastrado ainda.';
      destino.appendChild(aviso);
      return;
    }
    const tabela = document.createElement('table');
    const cabecalho = document.createElement('tr');
    ['Nome', 'Matrícula', 'Nota 1', 'Nota 2', 'Nota 3', 'Média', 'Situação', 'Editar'].forEach(nome => {
      const th = document.createElement('th'); th.textContent = nome; cabecalho.appendChild(th);
    });
    tabela.appendChild(cabecalho);
    alunos.forEach((aluno, indice) => {
      const linha = document.createElement('tr');
      [aluno.getNome(), aluno.getMatricula(), aluno.getNota1(), aluno.getNota2(),
       aluno.getNota3(), aluno.gerarMedia().toFixed(2), aluno.gerarEstado()].forEach(valor => {
        const td = document.createElement('td');
        td.textContent = valor;
        linha.appendChild(td);
      });
      const celula = document.createElement('td');
      const botao = document.createElement('button');
      botao.type = 'button'; botao.textContent = 'Editar notas';
      botao.addEventListener('click', () => aoEditar(indice));
      celula.appendChild(botao); linha.appendChild(celula);
      tabela.appendChild(linha);
    });
    destino.appendChild(tabela);
  }
}
