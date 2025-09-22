export interface Fornecedor {
    id: string;
    nome: string;
    cidade: string;
    precoPorPlaca: number;
    custoInstalacao: number;
    tempoInstalacao: number;
    avaliacao: number;
    telefone: string;
    email: string;
}

export interface SimulacaoUsuario {
    cpf: string;
    nome: string;
    email: string;
    telefone: string;
    endereco: string;
    cidade: string;
    consumoAtual: number;
    metaGeracao: number;
    tipoImovel: string;
    areaDisponivel: number;
    orcamentoMaximo: number;
}

export interface DadosEnriquecidos {
    rendaEstimada: string;
    veiculos: number;
    tipoResidencia: string;
    scoreSocioeconomico: string;
    indicadoresRegiao: {
        rendaMedia: number;
        densidadePopulacional: number;
        indiceDesenvolvimento: number;
    };
    informacoesGeograficas: {
        latitude: number;
        longitude: number;
        altitude: number;
        irradiacaoSolar: number;
    };
    potencialSolar: {
        horasSolDia: number;
        eficienciaEstimada: number;
        economiaAnual: number;
    };
}

export const fornecedores: Fornecedor[] = [
    {
        id: "1",
        nome: "SolarTech BH",
        cidade: "Belo Horizonte",
        precoPorPlaca: 850,
        custoInstalacao: 2500,
        tempoInstalacao: 15,
        avaliacao: 4.8,
        telefone: "(31) 99999-0001",
        email: "contato@solartechbh.com.br"
    },
    {
        id: "2",
        nome: "Energia Verde RJ",
        cidade: "Rio de Janeiro",
        precoPorPlaca: 920,
        custoInstalacao: 2800,
        tempoInstalacao: 12,
        avaliacao: 4.6,
        telefone: "(21) 99999-0002",
        email: "vendas@energiaverderj.com.br"
    },
    {
        id: "3",
        nome: "SunPower SP",
        cidade: "São Paulo",
        precoPorPlaca: 880,
        custoInstalacao: 2600,
        tempoInstalacao: 18,
        avaliacao: 4.9,
        telefone: "(11) 99999-0003",
        email: "orcamento@sunpowersp.com.br"
    },
    {
        id: "4",
        nome: "EcoSolar BH",
        cidade: "Belo Horizonte",
        precoPorPlaca: 820,
        custoInstalacao: 2400,
        tempoInstalacao: 20,
        avaliacao: 4.5,
        telefone: "(31) 99999-0004",
        email: "contato@ecosolar.com.br"
    },
    {
        id: "5",
        nome: "Green Energy RJ",
        cidade: "Rio de Janeiro",
        precoPorPlaca: 950,
        custoInstalacao: 3000,
        tempoInstalacao: 10,
        avaliacao: 4.7,
        telefone: "(21) 99999-0005",
        email: "info@greenenergy.com.br"
    },
    {
        id: "6",
        nome: "SolarMax SP",
        cidade: "São Paulo",
        precoPorPlaca: 900,
        custoInstalacao: 2700,
        tempoInstalacao: 14,
        avaliacao: 4.8,
        telefone: "(11) 99999-0006",
        email: "vendas@solarmax.com.br"
    }
];

export const simulacaoExemplo: SimulacaoUsuario = {
    cpf: "123.456.789-00",
    nome: "João Silva",
    email: "joao.silva@email.com",
    telefone: "(31) 99999-1234",
    endereco: "Rua das Flores, 123",
    cidade: "Belo Horizonte",
    consumoAtual: 350,
    metaGeracao: 280,
    tipoImovel: "Casa",
    areaDisponivel: 50,
    orcamentoMaximo: 25000
};

export const dadosEnriquecidosExemplo: DadosEnriquecidos = {
    rendaEstimada: "R$ 8.000 - R$ 12.000",
    veiculos: 2,
    tipoResidencia: "Casa própria",
    scoreSocioeconomico: "A+",
    indicadoresRegiao: {
        rendaMedia: 4500,
        densidadePopulacional: 7200,
        indiceDesenvolvimento: 0.85
    },
    informacoesGeograficas: {
        latitude: -19.9167,
        longitude: -43.9345,
        altitude: 858,
        irradiacaoSolar: 5.2
    },
    potencialSolar: {
        horasSolDia: 6.8,
        eficienciaEstimada: 0.85,
        economiaAnual: 4200
    }
};

export const cidades = ["Belo Horizonte", "Rio de Janeiro", "São Paulo"];

export function calcularROI(
    consumoAtual: number,
    metaGeracao: number,
    precoPorPlaca: number,
    custoInstalacao: number,
    numeroPlacas: number
) {
    const custoTotal = (precoPorPlaca * numeroPlacas) + custoInstalacao;
    const economiaMensal = (consumoAtual - metaGeracao) * 0.65;
    const economiaAnual = economiaMensal * 12;
    const tempoRetorno = custoTotal / economiaAnual;
    const roiAnual = (economiaAnual / custoTotal) * 100;

    return {
        custoTotal,
        economiaMensal,
        economiaAnual,
        tempoRetorno,
        roiAnual
    };
}
