export default function handler(req, res) {
  try {
    const { valor, tipo = "auto" } = req.method === "POST"
      ? req.body
      : req.query;

    const valorInput = Number(valor);
    const tipoInput = String(tipo).toLowerCase();

    if (!valorInput || isNaN(valorInput) || valorInput <= 0) {
      return res.status(400).json({
        error: "Valor inválido. Envie um número maior que zero."
      });
    }

    // CONFIGURAÇÕES
    const TAXA_TOTAL = 0.28;
    const PRAZO_AUTO = 76;
    const PRAZO_IMOVEL = 210;
    const TAXA_SEGURO = 0.000704;

    // LIMITE AUTO
    if (
      !(tipoInput.includes("imovel") || tipoInput.includes("casa")) &&
      valorInput > 300000
    ) {
      return res.json({
        message: `
Opa! 👋

Para **consórcio de Automóvel/Moto**, nossos créditos vão até **R$ 300.000,00**.

Mas para **Imóveis**, temos crédito disponível nesse valor e até acima disso!

Se quiser, posso simular como **Imóvel** para você.
        `.trim()
      });
    }

    // DEFINIÇÃO DO PRODUTO
    let nomeTipo = "Automóvel";
    let prazo = PRAZO_AUTO;

    if (
      tipoInput.includes("imovel") ||
      tipoInput.includes("casa") ||
      valorInput > 100000
    ) {
      nomeTipo = "Imóvel";
      prazo = PRAZO_IMOVEL;
    }

    // CÁLCULOS
    const parcela = (valorInput * (1 + TAXA_TOTAL)) / prazo;
    const seguro = valorInput * TAXA_SEGURO;

    const formatter = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    const resposta = `
SIMULAÇÃO PRONTA:

Produto: ${nomeTipo}
Crédito: ${formatter.format(valorInput)}
Prazo: ${prazo} meses
Parcela (SEM seguro): ${formatter.format(parcela)}
Taxas: 28% totais (já inclusas)
    `.trim();

    return res.json({ message: resposta });

  } catch (err) {
    return res.status(500).json({
      error: "Erro interno ao calcular simulação"
    });
  }
}
