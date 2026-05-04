import sportMusculacao from "@/assets/sport-musculacao.jpg";
import sportCrossfit from "@/assets/sport-crossfit.jpg";
import sportCorrida from "@/assets/sport-corrida.jpg";
import sportCiclismo from "@/assets/sport-ciclismo.jpg";
import sportTriathlon from "@/assets/sport-triathlon.jpg";

import vigorOuroClean from "@/assets/linha-vigor-ouro-clean.jpg";
import vigorPrataClean from "@/assets/linha-vigor-prata-clean.jpg";
import vigorCampaign from "@/assets/linha-vigor-ouro-only.jpg";
import halterCampaign from "@/assets/linha-halter-ouro-only.jpg";
import imperiumOuroClean from "@/assets/linha-imperium-ouro-clean.jpg";
import imperiumPrataClean from "@/assets/linha-imperium-prata-clean.jpg";
import imperiumCampaign from "@/assets/linha-imperium-ouro.jpg";
import triadeOuroClean from "@/assets/linha-triade-ouro-clean.jpg";
import triadePrataClean from "@/assets/linha-triade-prata-clean.jpg";
import triadeCampaign from "@/assets/linha-triade-ouro.jpg";

export type Material = "ouro" | "prata";
export type Forma = "classico" | "slim";

export type Linha = {
  slug: string;
  nome: string;
  assinatura: string;
  frase: string;
  imagens: Record<Material, string>;
  campaign: string;
};

export type Modalidade = {
  slug: string;
  nome: string;
  img: string;
  subtitulo: string;
  linhas: string[];
};

export const LINHAS: Record<string, Linha> = {
  vigor: {
    slug: "vigor",
    nome: "VIGOR",
    assinatura: "Assinatura da Força",
    frase: "Força que se constrói diariamente.",
    imagens: { ouro: vigorOuroClean, prata: vigorPrataClean },
    campaign: vigorCampaign,
  },
  halter: {
    slug: "halter",
    nome: "HALTER",
    assinatura: "Assinatura do Peso",
    frase: "O peso que esculpe o caráter.",
    imagens: { ouro: imperiumOuroClean, prata: imperiumPrataClean },
    campaign: imperiumCampaign,
  },
  imperium: {
    slug: "imperium",
    nome: "IMPERIUM",
    assinatura: "Assinatura do Domínio",
    frase: "O domínio sobre os próprios limites.",
    imagens: { ouro: imperiumOuroClean, prata: imperiumPrataClean },
    campaign: imperiumCampaign,
  },
  forja: {
    slug: "forja",
    nome: "FORJA",
    assinatura: "Assinatura da Intensidade",
    frase: "A intensidade transformada em arte.",
    imagens: { ouro: triadeOuroClean, prata: triadePrataClean },
    campaign: triadeCampaign,
  },
  triade: {
    slug: "triade",
    nome: "TRÍADE",
    assinatura: "Assinatura da Travessia",
    frase: "A travessia que define o espírito.",
    imagens: { ouro: triadeOuroClean, prata: triadePrataClean },
    campaign: triadeCampaign,
  },
  ritmo: {
    slug: "ritmo",
    nome: "RITMO",
    assinatura: "Assinatura do Movimento",
    frase: "O ritmo de uma vida em marcha.",
    imagens: { ouro: vigorOuroClean, prata: vigorPrataClean },
    campaign: vigorCampaign,
  },
  horizonte: {
    slug: "horizonte",
    nome: "HORIZONTE",
    assinatura: "Assinatura da Distância",
    frase: "Horizontes conquistados em silêncio.",
    imagens: { ouro: imperiumOuroClean, prata: imperiumPrataClean },
    campaign: imperiumCampaign,
  },
  cadencia: {
    slug: "cadencia",
    nome: "CADÊNCIA",
    assinatura: "Assinatura do Compasso",
    frase: "Cada giro, um pulso eterno.",
    imagens: { ouro: triadeOuroClean, prata: triadePrataClean },
    campaign: triadeCampaign,
  },
  travessia: {
    slug: "travessia",
    nome: "TRAVESSIA",
    assinatura: "Assinatura da Resistência",
    frase: "Atravessar é mais que vencer.",
    imagens: { ouro: vigorOuroClean, prata: vigorPrataClean },
    campaign: vigorCampaign,
  },
  elite: {
    slug: "elite",
    nome: "ÉLITE",
    assinatura: "Assinatura da Excelência",
    frase: "O refinamento dos que vão além.",
    imagens: { ouro: imperiumOuroClean, prata: imperiumPrataClean },
    campaign: imperiumCampaign,
  },
};

export const MODALIDADES: Modalidade[] = [
  {
    slug: "musculacao",
    nome: "Musculação",
    subtitulo: "Forjado em disciplina",
    img: sportMusculacao,
    linhas: ["vigor", "halter"],
  },
  {
    slug: "crossfit",
    nome: "Crossfit",
    subtitulo: "A intensidade como arte",
    img: sportCrossfit,
    linhas: ["imperium", "forja"],
  },
  {
    slug: "corrida",
    nome: "Corrida",
    subtitulo: "O ritmo de uma vida",
    img: sportCorrida,
    linhas: ["triade", "ritmo"],
  },
  {
    slug: "ciclismo",
    nome: "Ciclismo",
    subtitulo: "Horizontes conquistados",
    img: sportCiclismo,
    linhas: ["horizonte", "cadencia"],
  },
  {
    slug: "triathlon",
    nome: "Triathlon",
    subtitulo: "A travessia dos limites",
    img: sportTriathlon,
    linhas: ["travessia", "elite"],
  },
];
