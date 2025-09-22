"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  MapPin,
  DollarSign,
  Home,
  Car,
  TrendingUp,
  Sun,
  Calendar,
  Target,
  Building,
  Zap,
  Shield,
  TreePine,
  AlertTriangle,
} from "lucide-react";
import { simulacaoExemplo, dadosEnriquecidosExemplo } from "@/lib/mock-data";
import { useUser } from "@/lib/user-context";

export default function DashboardPage() {
  const { dadosUsuario } = useUser();
  const dadosEnriquecidos = dadosEnriquecidosExemplo;

  // Criar objeto simulacao com os dados do usuário
  const simulacao = {
    cpf: dadosUsuario.cpf || simulacaoExemplo.cpf,
    nome: dadosUsuario.nome || simulacaoExemplo.nome,
    email: dadosUsuario.email || simulacaoExemplo.email,
    telefone: dadosUsuario.telefone || simulacaoExemplo.telefone,
    endereco: dadosUsuario.endereco || simulacaoExemplo.endereco,
    cidade: dadosUsuario.cidade || simulacaoExemplo.cidade,
    consumoAtual: dadosUsuario.consumoAtual || simulacaoExemplo.consumoAtual,
    metaGeracao: dadosUsuario.metaGeracao || simulacaoExemplo.metaGeracao,
    tipoImovel: dadosUsuario.tipoImovel || simulacaoExemplo.tipoImovel,
    areaDisponivel:
      Number(dadosUsuario.areaDisponivel) || simulacaoExemplo.areaDisponivel,
    orcamentoMaximo:
      Number(dadosUsuario.orcamentoMaximo) || simulacaoExemplo.orcamentoMaximo,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Dashboard do Vendedor
        </h1>
        <p className="text-gray-600">
          Informações completas do lead e dados enriquecidos
        </p>
      </div>

      <Tabs defaultValue="lead" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="lead">Dados do Lead</TabsTrigger>
          <TabsTrigger value="enriquecidos">Dados Enriquecidos</TabsTrigger>
          <TabsTrigger value="bairro">Metadados do Bairro</TabsTrigger>
        </TabsList>

        <TabsContent value="lead">
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="mr-2 h-5 w-5" />
                    Informações Pessoais
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Nome
                      </label>
                      <p className="font-semibold">{simulacao.nome}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        CPF
                      </label>
                      <p className="font-semibold">{simulacao.cpf}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Email
                      </label>
                      <p className="font-semibold">{simulacao.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Telefone
                      </label>
                      <p className="font-semibold">{simulacao.telefone}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Endereço
                    </label>
                    <p className="font-semibold">{simulacao.endereco}</p>
                    <p className="text-sm text-gray-600">{simulacao.cidade}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Home className="mr-2 h-5 w-5" />
                    Informações do Imóvel
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Tipo de Imóvel
                      </label>
                      <p className="font-semibold">{simulacao.tipoImovel}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Área Disponível
                      </label>
                      <p className="font-semibold">
                        {simulacao.areaDisponivel} m²
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Consumo Atual
                      </label>
                      <p className="font-semibold">
                        {simulacao.consumoAtual} kWh/mês
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Meta de Geração
                      </label>
                      <p className="font-semibold">
                        {simulacao.metaGeracao} kWh/mês
                      </p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Orçamento Máximo
                    </label>
                    <p className="font-semibold text-green-600">
                      R$ {simulacao.orcamentoMaximo.toLocaleString("pt-BR")}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="mr-2 h-5 w-5" />
                  Análise de Potencial
                </CardTitle>
                <CardDescription>
                  Indicadores de interesse e potencial de conversão
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                      <TrendingUp className="h-8 w-8 text-green-600" />
                    </div>
                    <p className="text-sm text-gray-600">Potencial Alto</p>
                    <Badge variant="default" className="mt-1">
                      A+
                    </Badge>
                  </div>
                  <div className="text-center">
                    <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                      <DollarSign className="h-8 w-8 text-blue-600" />
                    </div>
                    <p className="text-sm text-gray-600">Orçamento</p>
                    <p className="font-semibold">R$ 25k</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                      <Sun className="h-8 w-8 text-yellow-600" />
                    </div>
                    <p className="text-sm text-gray-600">Área Solar</p>
                    <p className="font-semibold">50m²</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                      <Calendar className="h-8 w-8 text-purple-600" />
                    </div>
                    <p className="text-sm text-gray-600">Prazo</p>
                    <p className="font-semibold">30 dias</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="enriquecidos">
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building className="mr-2 h-5 w-5" />
                    Perfil Socioeconômico
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Renda Estimada
                      </label>
                      <p className="font-semibold">
                        {dadosEnriquecidos.rendaEstimada}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Score Socioeconômico
                      </label>
                      <Badge variant="default">
                        {dadosEnriquecidos.scoreSocioeconomico}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Veículos ({dadosEnriquecidos.veiculos.length})
                    </label>
                    <div className="space-y-2 mt-2">
                      {dadosEnriquecidos.veiculos.map((veiculo, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <Car className="h-5 w-5 text-blue-600" />
                            <div>
                              <p className="font-semibold">
                                {veiculo.marca} {veiculo.modelo}
                              </p>
                              <p className="text-sm text-gray-600">
                                {veiculo.ano} • {veiculo.tipo}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge
                              variant={
                                veiculo.combustivel === "eletrico"
                                  ? "default"
                                  : veiculo.combustivel === "hibrido"
                                  ? "secondary"
                                  : "outline"
                              }
                              className="mb-1"
                            >
                              {veiculo.combustivel === "eletrico"
                                ? "⚡ Elétrico"
                                : veiculo.combustivel === "hibrido"
                                ? "🔋 Híbrido"
                                : veiculo.combustivel === "flex"
                                ? "⛽ Flex"
                                : "⛽ Gasolina"}
                            </Badge>
                            <p className="text-sm font-semibold">
                              R$ {veiculo.valorEstimado.toLocaleString("pt-BR")}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Tipo de Residência
                    </label>
                    <p className="font-semibold">
                      {dadosEnriquecidos.tipoResidencia}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="mr-2 h-5 w-5" />
                    Indicadores da Região
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Renda Média
                      </label>
                      <p className="font-semibold">
                        R$ {dadosEnriquecidos.indicadoresRegiao.rendaMedia}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Densidade Pop.
                      </label>
                      <p className="font-semibold">
                        {dadosEnriquecidos.indicadoresRegiao.densidadePopulacional.toLocaleString(
                          "pt-BR"
                        )}
                        /km²
                      </p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Índice de Desenvolvimento
                    </label>
                    <div className="flex items-center">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{
                            width: `${
                              dadosEnriquecidos.indicadoresRegiao
                                .indiceDesenvolvimento * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                      <span className="font-semibold">
                        {(
                          dadosEnriquecidos.indicadoresRegiao
                            .indiceDesenvolvimento * 100
                        ).toFixed(0)}
                        %
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Sun className="mr-2 h-5 w-5" />
                    Informações Geográficas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Latitude
                      </label>
                      <p className="font-semibold">
                        {dadosEnriquecidos.informacoesGeograficas.latitude}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Longitude
                      </label>
                      <p className="font-semibold">
                        {dadosEnriquecidos.informacoesGeograficas.longitude}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Altitude
                      </label>
                      <p className="font-semibold">
                        {dadosEnriquecidos.informacoesGeograficas.altitude}m
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Irradiação Solar
                      </label>
                      <p className="font-semibold">
                        {
                          dadosEnriquecidos.informacoesGeograficas
                            .irradiacaoSolar
                        }{" "}
                        kWh/m²/dia
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5" />
                    Potencial Solar
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Horas de Sol/Dia
                      </label>
                      <p className="font-semibold">
                        {dadosEnriquecidos.potencialSolar.horasSolDia}h
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Eficiência Estimada
                      </label>
                      <p className="font-semibold">
                        {(
                          dadosEnriquecidos.potencialSolar.eficienciaEstimada *
                          100
                        ).toFixed(0)}
                        %
                      </p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Economia Anual Estimada
                    </label>
                    <p className="font-semibold text-green-600 text-xl">
                      R${" "}
                      {dadosEnriquecidos.potencialSolar.economiaAnual.toLocaleString(
                        "pt-BR"
                      )}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Resumo Executivo</CardTitle>
                <CardDescription>
                  Análise consolidada do lead para tomada de decisão
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-green-600">
                        95%
                      </span>
                    </div>
                    <h3 className="font-semibold mb-2">
                      Probabilidade de Conversão
                    </h3>
                    <p className="text-sm text-gray-600">
                      Lead com alto potencial baseado no perfil socioeconômico e
                      interesse demonstrado
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-blue-600">
                        A+
                      </span>
                    </div>
                    <h3 className="font-semibold mb-2">Qualidade do Lead</h3>
                    <p className="text-sm text-gray-600">
                      Perfil ideal com orçamento adequado e área disponível para
                      instalação
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-purple-600">
                        30
                      </span>
                    </div>
                    <h3 className="font-semibold mb-2">Prazo Estimado</h3>
                    <p className="text-sm text-gray-600">
                      Dias para fechamento baseado no histórico de leads
                      similares
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="bairro">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5" />
                  Informações do Bairro
                </CardTitle>
                <CardDescription>
                  Metadados geográficos e socioeconômicos do bairro
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-3">
                        Localização
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Bairro:</span>
                          <span className="font-semibold">
                            {dadosEnriquecidos.metadadosBairro.nome}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Zona:</span>
                          <span className="font-semibold">
                            {dadosEnriquecidos.metadadosBairro.zona}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Altitude Média:</span>
                          <span className="font-semibold">
                            {dadosEnriquecidos.metadadosBairro.altitudeMedia}m
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Inclinação do Terreno:
                          </span>
                          <span className="font-semibold">
                            {
                              dadosEnriquecidos.metadadosBairro
                                .inclinacaoTerreno
                            }
                            °
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-3">
                        Características Sociais
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Renda Média Familiar:
                          </span>
                          <span className="font-semibold">
                            R${" "}
                            {
                              dadosEnriquecidos.metadadosBairro
                                .rendaMediaFamiliar
                            }
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Densidade Populacional:
                          </span>
                          <span className="font-semibold">
                            {dadosEnriquecidos.metadadosBairro.densidadePopulacional.toLocaleString(
                              "pt-BR"
                            )}
                            /km²
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">IDH:</span>
                          <span className="font-semibold">
                            {
                              dadosEnriquecidos.metadadosBairro
                                .indiceDesenvolvimentoHumano
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-3">
                        Uso do Solo
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-gray-600">
                              Residencial
                            </span>
                            <span className="text-sm font-semibold">
                              {
                                dadosEnriquecidos.metadadosBairro
                                  .percentualResidencias
                              }
                              %
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{
                                width: `${dadosEnriquecidos.metadadosBairro.percentualResidencias}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-gray-600">
                              Comercial
                            </span>
                            <span className="text-sm font-semibold">
                              {
                                dadosEnriquecidos.metadadosBairro
                                  .percentualComercial
                              }
                              %
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-600 h-2 rounded-full"
                              style={{
                                width: `${dadosEnriquecidos.metadadosBairro.percentualComercial}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-gray-600">
                              Industrial
                            </span>
                            <span className="text-sm font-semibold">
                              {
                                dadosEnriquecidos.metadadosBairro
                                  .percentualIndustrial
                              }
                              %
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-orange-600 h-2 rounded-full"
                              style={{
                                width: `${dadosEnriquecidos.metadadosBairro.percentualIndustrial}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-3">
                        Infraestrutura
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Qualidade:</span>
                          <Badge variant="default">
                            {
                              dadosEnriquecidos.metadadosBairro
                                .qualidadeInfraestrutura
                            }
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Transporte Público:
                          </span>
                          <span className="font-semibold">
                            {
                              dadosEnriquecidos.metadadosBairro
                                .proximidadeTransportePublico
                            }
                            %
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Índice de Segurança:
                          </span>
                          <span className="font-semibold">
                            {dadosEnriquecidos.metadadosBairro.indiceSeguranca}
                            /10
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TreePine className="mr-2 h-5 w-5" />
                    Características Ambientais
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cobertura Vegetal:</span>
                    <span className="font-semibold">
                      {dadosEnriquecidos.metadadosBairro.coberturaVegetal}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Potencial Solar do Bairro:
                    </span>
                    <Badge variant="default">
                      {dadosEnriquecidos.metadadosBairro.potencialSolarBairro}
                      /10
                    </Badge>
                  </div>
                  <div>
                    <span className="text-gray-600">Obstruções Solares:</span>
                    <div className="mt-2 space-y-1">
                      {dadosEnriquecidos.metadadosBairro.obstrucoesSolares.map(
                        (obstrucao, index) => (
                          <div
                            key={index}
                            className="flex items-center text-sm"
                          >
                            <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2" />
                            <span>{obstrucao}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Sun className="mr-2 h-5 w-5" />
                    Potencial Solar Detalhado
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl font-bold text-green-600">
                        {dadosEnriquecidos.metadadosBairro.potencialSolarBairro}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Potencial Solar (0-10)
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Irradiação Solar:</span>
                      <span className="font-semibold">
                        {
                          dadosEnriquecidos.informacoesGeograficas
                            .irradiacaoSolar
                        }{" "}
                        kWh/m²/dia
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Horas de Sol/Dia:</span>
                      <span className="font-semibold">
                        {dadosEnriquecidos.potencialSolar.horasSolDia}h
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        Eficiência Estimada:
                      </span>
                      <span className="font-semibold">
                        {(
                          dadosEnriquecidos.potencialSolar.eficienciaEstimada *
                          100
                        ).toFixed(0)}
                        %
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Análise de Oportunidade</CardTitle>
                <CardDescription>
                  Avaliação baseada nos metadados do bairro e perfil do lead
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                      <Zap className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Alto Potencial Solar</h3>
                    <p className="text-sm text-gray-600">
                      Bairro com excelente irradiação solar e baixas obstruções
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                      <Shield className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Região Segura</h3>
                    <p className="text-sm text-gray-600">
                      Alto índice de segurança e infraestrutura de qualidade
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                      <TrendingUp className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Perfil Premium</h3>
                    <p className="text-sm text-gray-600">
                      Lead com veículos elétricos e alta renda familiar
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
