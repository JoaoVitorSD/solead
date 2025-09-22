"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface DadosUsuario {
  cpf: string;
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  cidade: string;
  tipoImovel: string;
  areaDisponivel: string;
  orcamentoMaximo: string;
  consumoAtual: number;
  metaGeracao: number;
  numeroPlacas: number;
}

interface UserContextType {
  dadosUsuario: DadosUsuario;
  salvarDadosUsuario: (dados: Partial<DadosUsuario>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [dadosUsuario, setDadosUsuario] = useState<DadosUsuario>({
    cpf: "",
    nome: "",
    email: "",
    telefone: "",
    endereco: "",
    cidade: "",
    tipoImovel: "",
    areaDisponivel: "",
    orcamentoMaximo: "",
    consumoAtual: 350,
    metaGeracao: 280,
    numeroPlacas: 8
  });

  const salvarDadosUsuario = (dados: Partial<DadosUsuario>) => {
    setDadosUsuario(prev => ({
      ...prev,
      ...dados
    }));
  };

  return (
    <UserContext.Provider value={{ dadosUsuario, salvarDadosUsuario }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser deve ser usado dentro de um UserProvider");
  }
  return context;
}
