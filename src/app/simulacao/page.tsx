"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calculator,
  MapPin,
  Phone,
  Mail,
  Star,
  Clock,
  DollarSign,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import {
  fornecedores,
  cidades,
  calcularROI,
  type Fornecedor,
} from "@/lib/mock-data";
import { useUser } from "@/lib/user-context";

export default function SimulacaoPage() {
  const { dadosUsuario, salvarDadosUsuario } = useUser();
  const [cidadeSelecionada, setCidadeSelecionada] = useState<string>("");
  const [consumoAtual, setConsumoAtual] = useState<number>(350);
  const [metaGeracao, setMetaGeracao] = useState<number>(280);
  const [numeroPlacas, setNumeroPlacas] = useState<number>(8);
  const [fornecedoresFiltrados, setFornecedoresFiltrados] = useState<
    Fornecedor[]
  >([]);
  const [errosValidacao, setErrosValidacao] = useState<{
    [key: string]: boolean;
  }>({});
  const [ordenacao, setOrdenacao] = useState<{
    campo: string;
    direcao: "asc" | "desc";
  }>({ campo: "", direcao: "asc" });

  const atualizarDadosUsuario = (campo: string, valor: string) => {
    salvarDadosUsuario({ [campo]: valor });
  };

  const salvarDadosCompletos = () => {
    salvarDadosUsuario({
      consumoAtual,
      metaGeracao,
      numeroPlacas,
    });
    alert(
      "Dados salvos com sucesso! Você pode visualizá-los no Dashboard do Vendedor."
    );
  };

  const validarCampos = () => {
    const erros: { [key: string]: boolean } = {};

    if (!cidadeSelecionada) {
      erros.cidade = true;
    }
    if (!consumoAtual || consumoAtual <= 0) {
      erros.consumoAtual = true;
    }
    if (!metaGeracao || metaGeracao <= 0) {
      erros.metaGeracao = true;
    }
    if (!numeroPlacas || numeroPlacas <= 0) {
      erros.numeroPlacas = true;
    }

    setErrosValidacao(erros);
    return Object.keys(erros).length === 0;
  };

  const filtrarFornecedores = () => {
    if (!validarCampos()) {
      return;
    }

    const filtrados = fornecedores.filter(
      (f) => f.cidade === cidadeSelecionada
    );
    setFornecedoresFiltrados(filtrados);
  };

  const ordenarFornecedores = (campo: string) => {
    const novaDirecao =
      ordenacao.campo === campo && ordenacao.direcao === "asc" ? "desc" : "asc";
    setOrdenacao({ campo, direcao: novaDirecao });

    const fornecedoresOrdenados = [...fornecedoresFiltrados].sort((a, b) => {
      let valorA: any, valorB: any;

      switch (campo) {
        case "nome":
          valorA = a.nome;
          valorB = b.nome;
          break;
        case "precoPorPlaca":
          valorA = a.precoPorPlaca;
          valorB = b.precoPorPlaca;
          break;
        case "custoInstalacao":
          valorA = a.custoInstalacao;
          valorB = b.custoInstalacao;
          break;
        case "tempoInstalacao":
          valorA = a.tempoInstalacao;
          valorB = b.tempoInstalacao;
          break;
        case "avaliacao":
          valorA = a.avaliacao;
          valorB = b.avaliacao;
          break;
        case "roiAnual":
          valorA = calcularComparacao(a).roiAnual;
          valorB = calcularComparacao(b).roiAnual;
          break;
        default:
          return 0;
      }

      if (valorA < valorB) return novaDirecao === "asc" ? -1 : 1;
      if (valorA > valorB) return novaDirecao === "asc" ? 1 : -1;
      return 0;
    });

    setFornecedoresFiltrados(fornecedoresOrdenados);
  };

  const obterCorCelula = (
    campo: string,
    valor: any,
    fornecedor: Fornecedor
  ) => {
    const calculo = calcularComparacao(fornecedor);

    switch (campo) {
      case "precoPorPlaca":
        return valor <= 850
          ? "bg-green-100 text-green-800"
          : valor >= 950
          ? "bg-red-100 text-red-800"
          : "bg-gray-100 text-gray-800";
      case "custoInstalacao":
        return valor <= 2500
          ? "bg-green-100 text-green-800"
          : valor >= 3000
          ? "bg-red-100 text-red-800"
          : "bg-gray-100 text-gray-800";
      case "tempoInstalacao":
        return valor <= 12
          ? "bg-green-100 text-green-800"
          : valor >= 20
          ? "bg-red-100 text-red-800"
          : "bg-gray-100 text-gray-800";
      case "avaliacao":
        return valor >= 4.8
          ? "bg-green-100 text-green-800"
          : valor <= 4.4
          ? "bg-red-100 text-red-800"
          : "bg-gray-100 text-gray-800";
      case "roiAnual":
        return valor >= 18
          ? "bg-green-100 text-green-800"
          : valor <= 12
          ? "bg-red-100 text-red-800"
          : "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const calcularComparacao = (fornecedor: Fornecedor) => {
    return calcularROI(
      consumoAtual,
      metaGeracao,
      fornecedor.precoPorPlaca,
      fornecedor.custoInstalacao,
      numeroPlacas
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Simulação de ROI
        </h1>
        <p className="text-gray-600">
          Calcule o retorno do seu investimento em energia solar
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="mr-2 h-5 w-5" />
                Parâmetros da Simulação
              </CardTitle>
              <CardDescription>
                Configure os dados para calcular o ROI
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Dados Pessoais</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cpf">CPF</Label>
                    <Input
                      id="cpf"
                      placeholder="000.000.000-00"
                      value={dadosUsuario.cpf}
                      onChange={(e) =>
                        atualizarDadosUsuario("cpf", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="nome">Nome Completo</Label>
                    <Input
                      id="nome"
                      placeholder="Seu nome completo"
                      value={dadosUsuario.nome}
                      onChange={(e) =>
                        atualizarDadosUsuario("nome", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={dadosUsuario.email}
                      onChange={(e) =>
                        atualizarDadosUsuario("email", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input
                      id="telefone"
                      placeholder="(00) 00000-0000"
                      value={dadosUsuario.telefone}
                      onChange={(e) =>
                        atualizarDadosUsuario("telefone", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="endereco">Endereço</Label>
                  <Input
                    id="endereco"
                    placeholder="Rua, número, bairro"
                    value={dadosUsuario.endereco}
                    onChange={(e) =>
                      atualizarDadosUsuario("endereco", e.target.value)
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cidade">Cidade *</Label>
                    <Select
                      value={cidadeSelecionada}
                      onValueChange={(value) => {
                        setCidadeSelecionada(value);
                        atualizarDadosUsuario("cidade", value);
                        if (errosValidacao.cidade) {
                          setErrosValidacao((prev) => ({
                            ...prev,
                            cidade: false,
                          }));
                        }
                      }}
                    >
                      <SelectTrigger
                        className={
                          errosValidacao.cidade ? "border-red-500" : ""
                        }
                      >
                        <SelectValue placeholder="Selecione uma cidade" />
                      </SelectTrigger>
                      <SelectContent>
                        {cidades.map((cidade) => (
                          <SelectItem key={cidade} value={cidade}>
                            {cidade}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errosValidacao.cidade && (
                      <p className="text-red-500 text-sm mt-1">
                        Cidade é obrigatória
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="tipoImovel">Tipo de Imóvel</Label>
                    <Select
                      value={dadosUsuario.tipoImovel}
                      onValueChange={(value) =>
                        atualizarDadosUsuario("tipoImovel", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Casa">Casa</SelectItem>
                        <SelectItem value="Apartamento">Apartamento</SelectItem>
                        <SelectItem value="Comercial">Comercial</SelectItem>
                        <SelectItem value="Industrial">Industrial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-4 border-t pt-4">
                <h3 className="font-semibold text-lg">Informações Técnicas</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="areaDisponivel">Área Disponível (m²)</Label>
                    <Input
                      id="areaDisponivel"
                      type="number"
                      placeholder="50"
                      value={dadosUsuario.areaDisponivel}
                      onChange={(e) =>
                        atualizarDadosUsuario("areaDisponivel", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="orcamentoMaximo">
                      Orçamento Máximo (R$)
                    </Label>
                    <Input
                      id="orcamentoMaximo"
                      type="number"
                      placeholder="25000"
                      value={dadosUsuario.orcamentoMaximo}
                      onChange={(e) =>
                        atualizarDadosUsuario("orcamentoMaximo", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="consumo">Consumo Atual (kWh/mês) *</Label>
                    <Input
                      id="consumo"
                      type="number"
                      value={consumoAtual}
                      onChange={(e) => {
                        setConsumoAtual(Number(e.target.value));
                        if (errosValidacao.consumoAtual) {
                          setErrosValidacao((prev) => ({
                            ...prev,
                            consumoAtual: false,
                          }));
                        }
                      }}
                      className={
                        errosValidacao.consumoAtual ? "border-red-500" : ""
                      }
                    />
                    {errosValidacao.consumoAtual && (
                      <p className="text-red-500 text-sm mt-1">
                        Consumo atual é obrigatório
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="meta">Meta de Geração (kWh/mês) *</Label>
                    <Input
                      id="meta"
                      type="number"
                      value={metaGeracao}
                      onChange={(e) => {
                        setMetaGeracao(Number(e.target.value));
                        if (errosValidacao.metaGeracao) {
                          setErrosValidacao((prev) => ({
                            ...prev,
                            metaGeracao: false,
                          }));
                        }
                      }}
                      className={
                        errosValidacao.metaGeracao ? "border-red-500" : ""
                      }
                    />
                    {errosValidacao.metaGeracao && (
                      <p className="text-red-500 text-sm mt-1">
                        Meta de geração é obrigatória
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="placas">Número de Placas *</Label>
                  <Input
                    id="placas"
                    type="number"
                    value={numeroPlacas}
                    onChange={(e) => {
                      setNumeroPlacas(Number(e.target.value));
                      if (errosValidacao.numeroPlacas) {
                        setErrosValidacao((prev) => ({
                          ...prev,
                          numeroPlacas: false,
                        }));
                      }
                    }}
                    className={
                      errosValidacao.numeroPlacas ? "border-red-500" : ""
                    }
                  />
                  {errosValidacao.numeroPlacas && (
                    <p className="text-red-500 text-sm mt-1">
                      Número de placas é obrigatório
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <Button onClick={filtrarFornecedores} className="w-full">
                  Buscar Fornecedores
                </Button>
                <Button
                  onClick={salvarDadosCompletos}
                  variant="outline"
                  className="w-full"
                >
                  Salvar Dados para Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {fornecedoresFiltrados.length > 0 ? (
            <Tabs defaultValue="comparacao" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="comparacao">Comparação</TabsTrigger>
                <TabsTrigger value="detalhes">Detalhes</TabsTrigger>
              </TabsList>

              <TabsContent value="comparacao">
                <Card>
                  <CardHeader>
                    <CardTitle>Comparação de Fornecedores</CardTitle>
                    <CardDescription>
                      Análise de ROI para fornecedores em {cidadeSelecionada}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead
                            className="cursor-pointer hover:bg-gray-50"
                            onClick={() => ordenarFornecedores("nome")}
                          >
                            <div className="flex items-center justify-between">
                              Fornecedor
                              <div className="flex flex-col">
                                <ChevronUp
                                  className={`h-3 w-3 ${
                                    ordenacao.campo === "nome" &&
                                    ordenacao.direcao === "asc"
                                      ? "text-blue-600"
                                      : "text-gray-400"
                                  }`}
                                />
                                <ChevronDown
                                  className={`h-3 w-3 ${
                                    ordenacao.campo === "nome" &&
                                    ordenacao.direcao === "desc"
                                      ? "text-blue-600"
                                      : "text-gray-400"
                                  }`}
                                />
                              </div>
                            </div>
                          </TableHead>
                          <TableHead
                            className="cursor-pointer hover:bg-gray-50"
                            onClick={() => ordenarFornecedores("precoPorPlaca")}
                          >
                            <div className="flex items-center justify-between">
                              Preço por Placa
                              <div className="flex flex-col">
                                <ChevronUp
                                  className={`h-3 w-3 ${
                                    ordenacao.campo === "precoPorPlaca" &&
                                    ordenacao.direcao === "asc"
                                      ? "text-blue-600"
                                      : "text-gray-400"
                                  }`}
                                />
                                <ChevronDown
                                  className={`h-3 w-3 ${
                                    ordenacao.campo === "precoPorPlaca" &&
                                    ordenacao.direcao === "desc"
                                      ? "text-blue-600"
                                      : "text-gray-400"
                                  }`}
                                />
                              </div>
                            </div>
                          </TableHead>
                          <TableHead
                            className="cursor-pointer hover:bg-gray-50"
                            onClick={() =>
                              ordenarFornecedores("custoInstalacao")
                            }
                          >
                            <div className="flex items-center justify-between">
                              Custo Instalação
                              <div className="flex flex-col">
                                <ChevronUp
                                  className={`h-3 w-3 ${
                                    ordenacao.campo === "custoInstalacao" &&
                                    ordenacao.direcao === "asc"
                                      ? "text-blue-600"
                                      : "text-gray-400"
                                  }`}
                                />
                                <ChevronDown
                                  className={`h-3 w-3 ${
                                    ordenacao.campo === "custoInstalacao" &&
                                    ordenacao.direcao === "desc"
                                      ? "text-blue-600"
                                      : "text-gray-400"
                                  }`}
                                />
                              </div>
                            </div>
                          </TableHead>
                          <TableHead
                            className="cursor-pointer hover:bg-gray-50"
                            onClick={() =>
                              ordenarFornecedores("tempoInstalacao")
                            }
                          >
                            <div className="flex items-center justify-between">
                              Tempo Instalação
                              <div className="flex flex-col">
                                <ChevronUp
                                  className={`h-3 w-3 ${
                                    ordenacao.campo === "tempoInstalacao" &&
                                    ordenacao.direcao === "asc"
                                      ? "text-blue-600"
                                      : "text-gray-400"
                                  }`}
                                />
                                <ChevronDown
                                  className={`h-3 w-3 ${
                                    ordenacao.campo === "tempoInstalacao" &&
                                    ordenacao.direcao === "desc"
                                      ? "text-blue-600"
                                      : "text-gray-400"
                                  }`}
                                />
                              </div>
                            </div>
                          </TableHead>
                          <TableHead
                            className="cursor-pointer hover:bg-gray-50"
                            onClick={() => ordenarFornecedores("avaliacao")}
                          >
                            <div className="flex items-center justify-between">
                              Avaliação
                              <div className="flex flex-col">
                                <ChevronUp
                                  className={`h-3 w-3 ${
                                    ordenacao.campo === "avaliacao" &&
                                    ordenacao.direcao === "asc"
                                      ? "text-blue-600"
                                      : "text-gray-400"
                                  }`}
                                />
                                <ChevronDown
                                  className={`h-3 w-3 ${
                                    ordenacao.campo === "avaliacao" &&
                                    ordenacao.direcao === "desc"
                                      ? "text-blue-600"
                                      : "text-gray-400"
                                  }`}
                                />
                              </div>
                            </div>
                          </TableHead>
                          <TableHead
                            className="cursor-pointer hover:bg-gray-50"
                            onClick={() => ordenarFornecedores("roiAnual")}
                          >
                            <div className="flex items-center justify-between">
                              ROI Anual
                              <div className="flex flex-col">
                                <ChevronUp
                                  className={`h-3 w-3 ${
                                    ordenacao.campo === "roiAnual" &&
                                    ordenacao.direcao === "asc"
                                      ? "text-blue-600"
                                      : "text-gray-400"
                                  }`}
                                />
                                <ChevronDown
                                  className={`h-3 w-3 ${
                                    ordenacao.campo === "roiAnual" &&
                                    ordenacao.direcao === "desc"
                                      ? "text-blue-600"
                                      : "text-gray-400"
                                  }`}
                                />
                              </div>
                            </div>
                          </TableHead>
                          <TableHead>Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {fornecedoresFiltrados.map((fornecedor) => {
                          const calculo = calcularComparacao(fornecedor);
                          return (
                            <TableRow key={fornecedor.id}>
                              <TableCell
                                className={obterCorCelula(
                                  "nome",
                                  fornecedor.nome,
                                  fornecedor
                                )}
                              >
                                <div>
                                  <div className="font-medium">
                                    {fornecedor.nome}
                                  </div>
                                  <div className="flex items-center text-sm">
                                    <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                                    {fornecedor.avaliacao}
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell
                                className={obterCorCelula(
                                  "precoPorPlaca",
                                  fornecedor.precoPorPlaca,
                                  fornecedor
                                )}
                              >
                                R${" "}
                                {fornecedor.precoPorPlaca.toLocaleString(
                                  "pt-BR"
                                )}
                              </TableCell>
                              <TableCell
                                className={obterCorCelula(
                                  "custoInstalacao",
                                  fornecedor.custoInstalacao,
                                  fornecedor
                                )}
                              >
                                R${" "}
                                {fornecedor.custoInstalacao.toLocaleString(
                                  "pt-BR"
                                )}
                              </TableCell>
                              <TableCell
                                className={obterCorCelula(
                                  "tempoInstalacao",
                                  fornecedor.tempoInstalacao,
                                  fornecedor
                                )}
                              >
                                {fornecedor.tempoInstalacao} dias
                              </TableCell>
                              <TableCell
                                className={obterCorCelula(
                                  "avaliacao",
                                  fornecedor.avaliacao,
                                  fornecedor
                                )}
                              >
                                <div className="flex items-center">
                                  <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                                  {fornecedor.avaliacao}
                                </div>
                              </TableCell>
                              <TableCell
                                className={obterCorCelula(
                                  "roiAnual",
                                  calculo.roiAnual,
                                  fornecedor
                                )}
                              >
                                <Badge
                                  variant={
                                    calculo.roiAnual > 15
                                      ? "default"
                                      : "secondary"
                                  }
                                >
                                  {calculo.roiAnual.toFixed(1)}%
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="outline" size="sm">
                                      Ver Detalhes
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-2xl">
                                    <DialogHeader>
                                      <DialogTitle>
                                        {fornecedor.nome}
                                      </DialogTitle>
                                      <DialogDescription>
                                        Informações detalhadas e contato
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <Label className="text-sm font-medium">
                                            Preço por Placa
                                          </Label>
                                          <p className="text-lg font-semibold">
                                            R$ {fornecedor.precoPorPlaca}
                                          </p>
                                        </div>
                                        <div>
                                          <Label className="text-sm font-medium">
                                            Custo de Instalação
                                          </Label>
                                          <p className="text-lg font-semibold">
                                            R$ {fornecedor.custoInstalacao}
                                          </p>
                                        </div>
                                        <div>
                                          <Label className="text-sm font-medium">
                                            Tempo de Instalação
                                          </Label>
                                          <p className="text-lg font-semibold">
                                            {fornecedor.tempoInstalacao} dias
                                          </p>
                                        </div>
                                        <div>
                                          <Label className="text-sm font-medium">
                                            Avaliação
                                          </Label>
                                          <div className="flex items-center">
                                            <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                                            <span className="text-lg font-semibold">
                                              {fornecedor.avaliacao}
                                            </span>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="border-t pt-4">
                                        <h4 className="font-semibold mb-2">
                                          Cálculo do ROI
                                        </h4>
                                        <div className="grid grid-cols-2 gap-4">
                                          <div>
                                            <Label className="text-sm font-medium">
                                              Custo Total
                                            </Label>
                                            <p className="text-lg font-semibold text-red-600">
                                              R${" "}
                                              {calculo.custoTotal.toLocaleString(
                                                "pt-BR"
                                              )}
                                            </p>
                                          </div>
                                          <div>
                                            <Label className="text-sm font-medium">
                                              Economia Anual
                                            </Label>
                                            <p className="text-lg font-semibold text-green-600">
                                              R${" "}
                                              {calculo.economiaAnual.toLocaleString(
                                                "pt-BR"
                                              )}
                                            </p>
                                          </div>
                                          <div>
                                            <Label className="text-sm font-medium">
                                              Tempo de Retorno
                                            </Label>
                                            <p className="text-lg font-semibold">
                                              {calculo.tempoRetorno.toFixed(1)}{" "}
                                              anos
                                            </p>
                                          </div>
                                          <div>
                                            <Label className="text-sm font-medium">
                                              ROI Anual
                                            </Label>
                                            <p className="text-lg font-semibold">
                                              {calculo.roiAnual.toFixed(1)}%
                                            </p>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="border-t pt-4">
                                        <h4 className="font-semibold mb-2">
                                          Contato
                                        </h4>
                                        <div className="space-y-2">
                                          <div className="flex items-center">
                                            <Phone className="h-4 w-4 mr-2" />
                                            <span>{fornecedor.telefone}</span>
                                          </div>
                                          <div className="flex items-center">
                                            <Mail className="h-4 w-4 mr-2" />
                                            <span>{fornecedor.email}</span>
                                          </div>
                                          <div className="flex items-center">
                                            <MapPin className="h-4 w-4 mr-2" />
                                            <span>{fornecedor.cidade}</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="detalhes">
                <div className="grid gap-4">
                  {fornecedoresFiltrados.map((fornecedor) => {
                    const calculo = calcularComparacao(fornecedor);
                    return (
                      <Card key={fornecedor.id}>
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle>{fornecedor.nome}</CardTitle>
                              <CardDescription className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {fornecedor.cidade}
                              </CardDescription>
                            </div>
                            <Badge
                              variant="outline"
                              className="flex items-center"
                            >
                              <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                              {fornecedor.avaliacao}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div className="text-center">
                              <DollarSign className="h-8 w-8 mx-auto mb-2 text-green-600" />
                              <p className="text-sm text-gray-600">
                                Preço por Placa
                              </p>
                              <p className="font-semibold">
                                R$ {fornecedor.precoPorPlaca}
                              </p>
                            </div>
                            <div className="text-center">
                              <DollarSign className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                              <p className="text-sm text-gray-600">
                                Instalação
                              </p>
                              <p className="font-semibold">
                                R$ {fornecedor.custoInstalacao}
                              </p>
                            </div>
                            <div className="text-center">
                              <Clock className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                              <p className="text-sm text-gray-600">Prazo</p>
                              <p className="font-semibold">
                                {fornecedor.tempoInstalacao} dias
                              </p>
                            </div>
                            <div className="text-center">
                              <Calculator className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                              <p className="text-sm text-gray-600">ROI Anual</p>
                              <p className="font-semibold">
                                {calculo.roiAnual.toFixed(1)}%
                              </p>
                            </div>
                          </div>

                          <div className="border-t pt-4">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="text-sm text-gray-600">
                                  Economia Anual Estimada
                                </p>
                                <p className="text-xl font-bold text-green-600">
                                  R${" "}
                                  {calculo.economiaAnual.toLocaleString(
                                    "pt-BR"
                                  )}
                                </p>
                              </div>
                              <Button variant="outline" size="sm">
                                Entrar em Contato
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Calculator className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold mb-2">
                  Selecione uma cidade
                </h3>
                <p className="text-gray-600">
                  Escolha uma cidade para ver os fornecedores disponíveis e
                  calcular o ROI
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
