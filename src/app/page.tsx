import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sun, Calculator, BarChart3, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Simule seu <span className="text-green-600">investimento</span> em
          energia solar
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Descubra quanto você pode economizar com painéis solares e encontre os
          melhores fornecedores da sua região com nossa plataforma inteligente.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/simulacao">
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              <Calculator className="mr-2 h-5 w-5" />
              Simular Agora
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button size="lg" variant="outline">
              <BarChart3 className="mr-2 h-5 w-5" />
              Dashboard do Vendedor
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <Card className="text-center">
          <CardHeader>
            <Sun className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <CardTitle>Análise Completa</CardTitle>
            <CardDescription>
              Calcule o ROI real do seu investimento em energia solar com dados
              precisos
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <Calculator className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <CardTitle>Comparação de Fornecedores</CardTitle>
            <CardDescription>
              Compare preços e serviços de fornecedores certificados em sua
              região
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <Zap className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
            <CardTitle>Economia Garantida</CardTitle>
            <CardDescription>
              Veja quanto você pode economizar na sua conta de energia
              mensalmente
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-8">Como Funciona</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-green-600">1</span>
            </div>
            <h3 className="font-semibold mb-2">Preencha seus dados</h3>
            <p className="text-sm text-gray-600">
              Informe seu consumo atual e localização
            </p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">2</span>
            </div>
            <h3 className="font-semibold mb-2">Escolha fornecedores</h3>
            <p className="text-sm text-gray-600">
              Compare opções da sua cidade
            </p>
          </div>
          <div className="text-center">
            <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-yellow-600">3</span>
            </div>
            <h3 className="font-semibold mb-2">Veja o ROI</h3>
            <p className="text-sm text-gray-600">
              Calcule tempo de retorno e economia
            </p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-purple-600">4</span>
            </div>
            <h3 className="font-semibold mb-2">Decida</h3>
            <p className="text-sm text-gray-600">
              Escolha a melhor opção para você
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
