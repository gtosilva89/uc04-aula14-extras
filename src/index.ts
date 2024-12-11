// bibliotecas e linguagem
// ler um arquivo de texto linha a linha

// fs - files system
import fs from "node:fs/promises";

async function main() {
  let lines: string[] = [];

  const file = await fs.open("exemplo.txt");

  for await (const line of file.readLines()){
    console.log(line);
    lines.push(line)
  }

  console.log(lines);
}

(async () => {
  await main();
})();
