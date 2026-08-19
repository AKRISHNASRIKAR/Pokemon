import type { MetadataRoute } from "next";
import { getAllPokemonNames } from "@/services/pokemonApi";

const SITE_URL = "https://pokemon-pipeline.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const names = await getAllPokemonNames();

  return [
    {
      url: SITE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...names.map(({ name }) => ({
      url: `${SITE_URL}/${name}`,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
