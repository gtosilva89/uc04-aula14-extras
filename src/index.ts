// bibliotecas da linguagem
// ler um arquivo de texto linha a linha

// fs - file system
import Scanner from "@codeea/scanner";
import fs from "node:fs/promises";

type Contato = {
  nome: string;
  telefone: string;
  email: string;
  endereco: string;
};

let scanner: Scanner;

async function main() {
  // await readFileExample();

  const nome = await scanner.question("Informe o nome: ");
  const telefone = await scanner.question("Informe o telefone: ");
  const email = await scanner.question("Informe o email: ");
  const endereco = await scanner.question("Informe o endereço: ");

  await saveContact(nome, telefone, email, endereco);

  await readCSV();
}

async function readFileExample() {
  let lines: string[] = [];

  const file = await fs.open("exemplo.txt");

  for await (const line of file.readLines()) {
    console.log(line);
    lines.push(line);
  }

  console.log(lines);
}

async function readCSV(startToReadFromLine: number = 1) {
  let lines: string[] = [];
  const file = await fs.open("./public/contatos.csv");
  for await (const line of file.readLines()) {
    lines.push(line);
  }
  console.log(lines);
  const contatos: Contato[] = [];
  for (let i = startToReadFromLine; i < lines.length; i++) {
    // validar se a linha estiver em branco, não deve pegar os dados
    if (lines[i].trim().length === 0) continue;
    const campos = lines[i].replace(/"/g, "").split(",");
    const contato: Contato = {
      nome: campos[0],
      telefone: campos[1],
      email: campos[2],
      endereco: campos[3],
    };
    contatos.push(contato);
  }

  console.log(contatos);
}

async function saveContact(
  nome: string,
  telefone: string,
  email: string,
  endereco: string
) {
  await fs.appendFile(
    "./public/contatos.csv",
    `\n${nome},${telefone},${email},${endereco}`
  );
}

(async () => {
  scanner = new Scanner();
  await main();
  scanner.close();
})();