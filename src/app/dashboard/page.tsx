"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  MapPin,
  Phone,
  Mail,
  DollarSign,
  Home,
  Car,
  TrendingUp,
  Sun,
  Calendar,
  Target,
  Building,
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
    areaDisponivel: Number(dadosUsuario.areaDisponivel) || simulacaoExemplo.areaDisponivel,
    orcamentoMaximo: Number(dadosUsuario.orcamentoMaximo) || simulacaoExemplo.orcamentoMaximo
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
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="lead">Dados do Lead</TabsTrigger>
          <TabsTrigger value="enriquecidos">Dados Enriquecidos</TabsTrigger>
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
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Veículos
                      </label>
                      <p className="font-semibold">
                        {dadosEnriquecidos.veiculos}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Tipo de Residência
                      </label>
                      <p className="font-semibold">
                        {dadosEnriquecidos.tipoResidencia}
                      </p>
                    </div>
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
      </Tabs>
    </div>
  );
}
